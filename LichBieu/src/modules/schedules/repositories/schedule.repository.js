import ScheduleModel from '../models/schedule.models';
import TreeNodeModel  from '../../utility/models/treenode.models';
import {
  ScheduleStatus
} from '../commons/schedule.status';


const createSchedule = async (subjects) => {
  var tmp = []
  var index = 1
  var subjects2 = []
  var array2 = []
  // loc ra chi so index 1
  subjects.forEach((item, i) => {
      if((item.MonTienQuyet== undefined) && (item.MonHocTruoc==undefined))
          {
          var s =item.toObject()
          s.index = index
          s.HK = 0
          tmp.push(s)
          }
      else {
        subjects2.push(item)
      }
  });
  subjects = subjects2
  index += 1
// bat dau loc ra index >1
 while (subjects.length > 0 ) {
var array1 = []
tmp.forEach((item, i) => {
  var s
  //xet mon tien quyet
  subjects.forEach(function(item2, i2, object){
    if(item.MaHocPhan === item2.MonTienQuyet && item2.MonTienQuyet!== undefined)
    {
      s = item2.toObject()
      s.index = index
      s.HK = 0
      array1.push(s)
      object.splice(i2, 1);
    }
    if ((item.MaHocPhan === item2.MonHocTruoc)&& item2.MonHocTruoc!==undefined) {
      s = item2.toObject()
      s.index = index
      s.HK = 0
      array1.push(s)
      object.splice(i2, 1);
    }
  });
});
array1.forEach((item, i) => {
  tmp.push(item)
});
index +=1
}
//hoan thanh xap xep index bat dau tao lich dua vao tmp array



};




const getSchedule = async (_id) => {

};
const getAllSchedules = async (page, limit) => {

};



const updateSchedule = async (_id, data) => {
};

function convertArrayToString(filters) {
  let string = "";
  filters.map(element => {
    string += element + ' ';
  });
  return string;
};

const getSchedulesByFilter = async (filters) => {
  const result = await ScheduleModel.find({
    status: ScheduleStatus.UNACTIVE
  }).select(filters)
  return result;
};


const blockSchedule = async (_id) => {
  const result = await ScheduleModel.updateOne({
    _id,
    status: ScheduleStatus.ACTIVE
  }, {
    status: ScheduleStatus.UNACTIVE
  });
  if (result.n === result.nModified) return true;
  return false;
};

export default {
  createSchedule,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  convertArrayToString,
  getSchedulesByFilter,
  blockSchedule
};
