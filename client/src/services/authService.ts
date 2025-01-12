import { Reservation } from '../types/Reservation';
import { EditProfileData, LoginData, RegisterData, User } from '../types/User';
import { get, post, del, put } from './request';

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    edit: '/users/edit/',
    delete: '/users/',
    reservations: '/users/reservations/',
};

const login = async (data: LoginData) => await post(endpoints.login, data);

const register = async (data: RegisterData) => await post(endpoints.register, data);

const userLogout = async (user: User) => await get(endpoints.logout,null, user);

const userEdit = async (data: EditProfileData, user: User) => await put(endpoints.edit + user._id, data, user);

const userDelete = async (user: User) => await del(endpoints.delete + user._id, null, user);

const userUpdateReservations = async (id: string, reservation: Reservation, user: User) => await put(endpoints.reservations + id, reservation, user);

const getAllUserReservations = async () => await get(endpoints.reservations);

export {
    login,
    register,
    userLogout,
    userEdit,
    userDelete,
    userUpdateReservations,
    getAllUserReservations,
}
