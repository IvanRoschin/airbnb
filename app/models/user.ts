import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const nameRegexp =
  /^[a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'\s]*[a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'][a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'\s]*$/;

const passwordRegexp = /^\S+$/;
const emailRegexp = /^[^а-яА-ЯёЁ!#$%*/?^`+&{|}~]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export interface UserModel {
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  password: string;
  favoriteIds: [Schema.Types.ObjectId];
  accounts: [Schema.Types.ObjectId];
  listings: [Schema.Types.ObjectId];
  reservations: [Schema.Types.ObjectId];
}

const userSchema = new Schema<UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      match: [nameRegexp, "Name must be only Arabic letters"],
      minLength: 2,
      maxLength: 16,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      match: [emailRegexp, "Invalid email format"],
      minLength: 5,
      maxLength: 63,
      unique: true,
    },
    emailVerified: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordRegexp, "Password can't contain white spaces"],
      minLength: 7,
      maxLength: 8,
    },
    favoriteIds: {
      type: [Schema.Types.ObjectId],
    },
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  },
  { versionKey: false, timestamps: true }
);

userSchema.index({ email: 1 });

//When the user registers

userSchema.pre("save", async function (this: any, next: any) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

//ComparePasswords
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compareSync(password, this.password);
};

const User = models?.User || model("User", userSchema);

export default User;
