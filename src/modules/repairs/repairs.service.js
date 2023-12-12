import { RepairsModel } from "./repairs.model.js";

export class RepairsService{

  static async finAllRepair(){
    return await RepairsModel.findAll({
      where:{
        status:"pending"
      }
    })
  }

  static async findById(id){
    return await RepairsModel.findOne({
      where:{
        id,
        status:"pending"
      }
    })
  }

  static async findRepairUserId(userId){
    return await RepairsModel.findAll({
      where:{
        userId
      }
    })
  }

  static async findByAccount(accountId){
    return await RepairsModel.findOne({
      where:{
        accountId,
        status:"pending"
      }
    })
  }

  static async createRepairs(data){
    return await RepairsModel.create(data)
  }

  static async updateRepair(user){
    return await user.update({
      status:"completed"
    })
  }

  static async deleteRepair(user){
    return await user.update({
      status:"cancelled"
    })
  }
}