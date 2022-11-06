import { createContext } from "react";
import AuthService from "@/services/AuthService";

const context = createContext<AuthService | null>(null);

export default context;
