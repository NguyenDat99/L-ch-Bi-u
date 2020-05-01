import SubjectModel from '../models/subject.models';
import SettingModel  from '../models/setting.model';
import {
  SubjectStatus
} from '../commons/subject.status';

const createSubject = async (data) => {
  // var maxSizeOfProperties = 5
  // if (data.maxSizeOfProperties != undefined)
  //   maxSizeOfProperties = data.maxSizeOfProperties
  // var keyCount = 0
  // Object.keys(data.properties).forEach(key => {
  //   if (data.properties[key].status == "ACTIVE")
  //     keyCount += 1
  // })
  // if (keyCount > maxSizeOfProperties) return NaN
  console.log(data);
  const result = await SubjectModel.create(data);
  return result;
};

const createSetting = async (data) => {
  const result = await SettingModel.create(data);
  return result;
}

const getSubject = async (_id) => {
  var setting = (await SettingModel.findOne()).properties
  var subject = await SubjectModel.findOne({
    _id,
    status: SubjectStatus.ACTIVE
  });
  //xu ly setting
  Object.keys(subject.properties).forEach(SubjectKey => {
    if (setting != undefined) {
        var co = 0
          setting.forEach(SettingKey => {
            if(SubjectKey == SettingKey )
             {
               co = 1;
             }
          })
      if (co == 0) {
        delete subject.properties[SubjectKey]
      }
    }
  })
return subject
};
const getAllSubjects = async (page, limit) => {
  //chuyen thanh mang tu setting
  // var tmp = {}
  // if (setting != undefined)
  //   tmp = setting.split(",")
  // lay du lieu

  var setting = (await SettingModel.findOne()).properties

  var subjects = await SubjectModel
    .find({
      status: SubjectStatus.ACTIVE
    })
    .where('_id')
    .limit(limit)
    .skip(limit * page);

  //forEach
  subjects.forEach(forEachFunc)
  function forEachFunc(subject, index) {
    if (subject.properties != undefined)
      //xu ly trong properties
      Object.keys(subject.properties).forEach(SubjectKey => {
        if (setting != undefined) {
            var co = 0
              setting.forEach(SettingKey => {
                if(SubjectKey == SettingKey )
                 {
                   co = 1;
                 }
              })
          if (co == 0) {
            delete subject.properties[SubjectKey]
          }
        }
      })
  }
  return subjects;
};


const getAllSubjectInputBySubjectId = async (page, limit, SubjectId) => {
    var setting = (await SettingModel.findOne()).properties
  var subjects = await SubjectModel
    .find({
      status: SubjectStatus.ACTIVE,
      SubjectId: SubjectId
    })
    .where('_id')
    .limit(limit)
    .skip(limit * page);
    //forEach
    subjects.forEach(forEachFunc)
    function forEachFunc(subject, index) {
      if (subject.properties != undefined)
        //xu ly trong properties
        Object.keys(subject.properties).forEach(SubjectKey => {
          if (setting != undefined) {
              var co = 0
                setting.forEach(SettingKey => {
                  if(SubjectKey == SettingKey )
                   {
                     co = 1;
                   }
                })
            if (co == 0) {
              delete subject.properties[SubjectKey]
            }
          }
        })
    }
    return subjects;
};

const updateSetting = async (data) => {
  var _id = (await SettingModel.findOne().where('_id'))._id
  const result = await SettingModel.updateOne({
    _id
  }, {
    ...data
  });
  if (result.n === result.nModified) return true;
  return false;
}

const updateSubject = async (_id, data) => {
  var newData = (await SubjectModel
    .findOne({
      _id,
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

  //xu ly maxSizeOfProperties
  // var maxSizeOfProperties = (await SubjectModel
  //     .findOne({
  //       _id,
  //       status: SubjectStatus.ACTIVE
  //     }))
  //   .maxSizeOfProperties;
  // if (data.maxSizeOfProperties != undefined) {
  //   maxSizeOfProperties = data.maxSizeOfProperties
  // }
  // var keyCount = 0
  // if (data.properties != undefined)
  //   Object.keys(data.properties).forEach(key => {
  //     if (data.properties[key].status == "ACTIVE")
  //       keyCount += 1
  //   })
  // if (keyCount > maxSizeOfProperties) return NaN

  const result = await SubjectModel.updateOne({
    _id,
    status: SubjectStatus.ACTIVE
  }, {
    ...data
  });
  // //cap nhat lai maxSizeOfProperties cho toan bo
  // var dt = await SubjectModel
  //   .find()
  // dt.forEach(forEachFunc)
  //
  // function forEachFunc(item, index) {
  //   if (item.maxSizeOfProperties != undefined)
  //     item.maxSizeOfProperties = maxSizeOfProperties
  //   item.save
  // }
  //kiem tra cap nhat
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


const blockSubject = async (_id) => {
  const result = await SubjectModel.updateOne({
    _id,
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
  updateSubject,
  convertArrayToString,
  getSubjectsByFilter,
  blockSubject,
  createSetting,
  updateSetting
};
