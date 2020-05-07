import ScheduleModel from '../models/schedule.models';
import TreeNodeModel  from '../../utility/models/treenode.models';
import {
  ScheduleStatus
} from '../commons/schedule.status';

function tongSoTC(array,max){
  var sum = 0
  array.forEach((item, i) => {
    sum += item.SoTinChi
  });
  if (sum > max) return false
  return true
}

function tongSoMon(array,max){
  if (array.length > max) return false
  return true
}

function chiSoToiDaHocKy(subjects){
  var max = 0
  subjects.forEach((item, i) => {
    if(item.HK > max)
      max = item.HK
  });
  return max
}
//tyLe DaiCuong/(ChuyenNganh+DaiCuong)
function kiemTraTyLeMonHoc(array,tyLe,dungSaiChoPhepTyLeMonHoc){
  var daiCuong = 0
  var daiCuong2 = 0
  var chuyenNganh = 0
  array.forEach((item, i) => {
    if(item.TheLoaiHocPhan === "Đại Cương")
        daiCuong +=1
    else if(item.TheLoaiHocPhan === "Chuyên Ngành")
        chuyenNganh +=1
  });
  var dungSai = 0
  if(daiCuong>0) dungSai = Math.abs((daiCuong/(daiCuong+chuyenNganh)) - tyLe)
  if ((dungSaiChoPhepTyLeMonHoc - dungSai ) > 0) return true;
  else {
    return false
  }
}


function kiemTraMonHocTruocVaMonTienQuyet(array,subject,array2){
  var co = 0
  array.forEach((item, i) => {
    if(((item.MaHocPhan === subject.MonHocTruoc)&& (subject.MonHocTruoc !==undefined)) ||
    ((item.MaHocPhan === subject.MonTienQuyet)&& (subject.MonTienQuyet !==undefined)))
        co +=1
  });
  array2.forEach((item, i) => {
    if((((item.MaHocPhan === subject.MonHocTruoc)&& (subject.MonHocTruoc !==undefined)) ||
    ((item.MaHocPhan === subject.MonTienQuyet)&& (subject.MonTienQuyet !==undefined)))
    && item.HK === 0)
          {
            co +=1
            console.log("sub: " + subject.MonHocTruoc);
          }
  });
  // console.log("sub: " + subject.MonHocTruoc);
  // console.log(co);
  //console.log(array2.length);
  if(co <1) return true;
  return false
}


const createSchedule = async (subjects,data) => {
  //chi so dieu chinh
  const soHocKyToiDa = typeof data.soHocKyToiDa !== 'undefined' ? data.soHocKyToiDa : 6
  const tongSoTinChiDaoTao = typeof data.tongSoTinChiDaoTao !== 'undefined' ? (data.tongSoTinChiDaoTao - 10) : (154 - 10)
  const soTinChiToiDa = Math.ceil(tongSoTinChiDaoTao/(soHocKyToiDa-1))
  const soMonHocToiDa =  typeof data.soMonHocToiDa !== 'undefined' ? data.soMonHocToiDa: 10
  const tyLeDaiCuong_ChuyenNganh = typeof data.tyLeDaiCuong_ChuyenNganh !== 'undefined' ? data.tyLeDaiCuong_ChuyenNganh : 0.8//tyLe DaiCuong/(ChuyenNganh+DaiCuong)
  const dungSaiChoPhepTyLeMonHoc = typeof data.dungSaiChoPhepTyLeMonHoc !== 'undefined' ? data.dungSaiChoPhepTyLeMonHoc : 0.2//dung sai voi tyLe DaiCuong/(ChuyenNganh+DaiCuong)
  ////////////////////
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
// tong so chi <25 tong so mon < 10
//
const tkb=[]
var soHK = 0
while (soHK < soHocKyToiDa) {
  var hk = chiSoToiDaHocKy(tmp) + 1
  var tkb_moiKy = []
  var tkb_moiKy2 = []
  var s
  tmp.forEach((item, i) => {
    if((item.YeuCauHocKy!== undefined) && (hk === item.YeuCauHocKy))
    {
      s = item
      s.HK = hk
      tkb_moiKy.push(item)
    }
    else if((item.HK === 0) && tongSoTC(tkb_moiKy,soTinChiToiDa) && tongSoMon(tkb_moiKy,soMonHocToiDa) &&
       kiemTraTyLeMonHoc(tkb_moiKy,tyLeDaiCuong_ChuyenNganh,dungSaiChoPhepTyLeMonHoc))
      {
        if(kiemTraMonHocTruocVaMonTienQuyet(tkb_moiKy,item,tmp))//tmp.slice(i+1,tmp.length)))
        {
          s = item
          s.HK = hk
          tkb_moiKy.push(item)
        }
      }
  });
  tmp.forEach((item, i) => {
      if((item.HK === 0) && tongSoTC(tkb_moiKy,soTinChiToiDa) && tongSoMon(tkb_moiKy,soMonHocToiDa))
      {
        if(kiemTraMonHocTruocVaMonTienQuyet(tkb_moiKy,item,tmp))//tmp.slice(i+1,tmp.length)))
        {
          s = item
          s.HK = hk
          tkb_moiKy.push(item)
        }
      }
  });
//  console.log(tkb_moiKy);
tkb_moiKy.forEach((item, i) => {
    if(item.HK === hk)
    {
      tkb_moiKy2.push(item)
    }
});

  tkb.push(tkb_moiKy2)
  soHK = hk
}

// console.log(tmp[3]);
//console.log(tkb[0]);
// const result = await ScheduleModel.create(tkb[0]);
return tkb
}




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
