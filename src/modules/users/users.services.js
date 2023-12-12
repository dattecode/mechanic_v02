import { UserModel } from "./users.model.js";


export class UserService{
  static async findOneId(id){
    return await UserModel.findOne({
      where:{
        id,
        status:"active"
      }
    })
  }

  static async findOneEmail(email){
    return await UserModel.findOne({
      where:{
        email,
        status:"active"
      }
    })
  }

  static async findAllUsers(){
    return await UserModel.findAll({
      where:{
        status:"active"
      }
    })
  }

  static async createUser(data){
    return await UserModel.create(data)
  }

  static async updateUser(user,data){
    return await user.update(data)
  }

  static async delete(user){
    return await user.update({
      status:"disable"
    })
  }

}