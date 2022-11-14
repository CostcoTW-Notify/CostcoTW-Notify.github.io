import { createContext } from "react";
import AuthService from "@/services/AuthService";

const context = createContext<AuthService>(new AuthService());

export default context;
