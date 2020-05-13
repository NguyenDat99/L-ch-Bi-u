import SubjectModel from '../models/subject.models';
import {
  SubjectStatus
} from '../commons/subject.status';

const createSubject = async (data) => {
  const result = await SubjectModel.create(data);
  return result;
};


const getSubject = async (MaHocPhan) => {
  var subject = await SubjectModel.findOne({
    MaHocPhan,
    TrangThaiMonHoc: SubjectStatus.ACTIVE
  });
return subject
};


const getAllSubjects = async (page, limit) => {
  var subjects = await SubjectModel
    .find({
      TrangThaiMonHoc: SubjectStatus.ACTIVE
    })
    .limit(limit)
    .skip(limit * page);
  return subjects;
};

const getAllSubjectsForSchedule = async () => {
  var subjects = await SubjectModel
    .find({
      TrangThaiMonHoc: SubjectStatus.ACTIVE
    })
  return subjects;
};


const getAllSubjectInputBy_SoTinChi= async (page, limit, SoTinChi) => {
    var setting = (await SettingModel.findOne()).properties
  var subjects = await SubjectModel
    .find({
      status: SubjectStatus.ACTIVE,
      SoTinChi: SoTinChi
    })
    .limit(limit)
    .skip(limit * page);
    return subjects;
};


const updateSubject = async (MaHocPhan, data) => {
  var newData = (await SubjectModel
    .findOne({
      MaHocPhan,
      status: SubjectStatus.ACTIVE
    }))
  var newAtt = []
  if (data.properties != undefined) {
    Object.keys(data.properties).forEach(dataKey => {
      var co = 0
      if (newData.properties != undefined)
        Object.keys(newData.properties).forEach(newDataKey => {
          if (dataKey == newDataKey) {
            newData.properties[newDataKey] = data.properties[dataKey]
            co = 1
          }
        })
      if (co == 0) {
        newAtt.push([dataKey, data.properties[dataKey]])
      }
    })
  }

  if (newAtt.length > 0 && newData.properties != undefined) {
    newAtt.forEach(function a(item, index) {
      newData.properties[item[0].toString()] = item[1]
    })
  }

  if (data.properties != undefined && newData.properties != undefined)
    data.properties = newData.properties

  const result = await SubjectModel.updateOne({
    MaHocPhan,
    status: SubjectStatus.ACTIVE
  }, {
    ...data
  });
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

const getSubjectsByFilter = async (filters) => {
  const result = await SubjectModel.find({
    status: SubjectStatus.UNACTIVE
  }).select(filters)
  return result;
};


const blockSubject = async (MaHocPhan) => {
  const result = await SubjectModel.updateOne({
    MaHocPhan,
    status: SubjectStatus.ACTIVE
  }, {
    status: SubjectStatus.UNACTIVE
  });
  if (result.n === result.nModified) return true;
  return false;
};

export default {
  createSubject,
  getSubject,
  getAllSubjects,
  getAllSubjectsForSchedule,
  updateSubject,
  convertArrayToString,
  getSubjectsByFilter,
  blockSubject
};
