import MajorModel from '../models/major.models';
import {
  MajorStatus
} from '../commons/major.status';

const createMajor = async (data) => {
  const result = await MajorModel.create(data);
  return result;
};


const getMajor = async (MaKhoa) => {
  var major = await MajorModel.findOne({
    MaKhoa: MaKhoa,
    status: MajorStatus.ACTIVE
  });
return major
};


const getAllMajor = async (page, limit) => {
  var majors = await MajorModel
    .find({
      status: MajorStatus.ACTIVE
    })
    .limit(limit)
    .skip(limit * page);
  return majors;
};


const updateMajor = async (MaKhoa, data) => {
  const result = await MajorModel.updateOne({
    MaKhoa: MaKhoa
},
    { ...data });
if (result.n === result.nModified) return true;
return false;
};

function convertArrayToString(filters) {
  let string = "";
  filters.map(element => {
    string += element + ' ';
  });
  return string;
};




export default {
createMajor,
getMajor,
getAllMajor,
updateMajor
};
