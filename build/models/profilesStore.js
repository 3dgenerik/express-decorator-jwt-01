"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProfilesStore {
    getAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM profiles_table';
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
    createProfile(profile, userIdJwt) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            //ISPRAVI TRECI PARAMETAR
            const sql = 'INSERT INTO profiles_table (first_name, last_name, date_of_birth, user_id) VALUES($1, $2, $3, $4) RETURNING *';
            const result = yield conn.query(sql, [
                profile.first_name,
                profile.last_name,
                profile.date_of_birth,
                userIdJwt,
            ]);
            conn.release();
            return result.rows[0];
        });
    }
}
exports.ProfilesStore = ProfilesStore;
