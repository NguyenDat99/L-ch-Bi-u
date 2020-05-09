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
function kiemTraTyLeMonHocTheoSoMonHoc(array,tyLe,dungSaiChoPhepTyLeMonHoc){
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

//tyLe tcDaiCuong/(tcChuyenNganh+tcDaiCuong)
function kiemTraTyLeMonHocTheoSoTinChi(array,tyLe,dungSaiChoPhepTyLeMonHoc){
  var daiCuong = 0
  var daiCuong2 = 0
  var chuyenNganh = 0
  array.forEach((item, i) => {
    if(item.TheLoaiHocPhan === "Đại Cương")
        daiCuong += item.SoTinChi
    else if(item.TheLoaiHocPhan === "Chuyên Ngành")
        chuyenNganh +=item.SoTinChi
  });
  var dungSai = 0
  if(daiCuong>0) dungSai = Math.abs((daiCuong/(daiCuong+chuyenNganh)) - tyLe)
  if ((dungSaiChoPhepTyLeMonHoc - dungSai ) > 0) return true;
  else {
    return false
  }
}
function uTienMonHocTruoc(tkb_HKTruoc,monHoc,tongMonHoc){
  var co = 0
  tkb_HKTruoc.forEach((item, i) => {
    if((((item.MaHocPhan === monHoc.MonHocTruoc)&& (monHoc.MonHocTruoc !==undefined)) ||
    ((item.MaHocPhan === monHoc.MonTienQuyet)&& (monHoc.MonTienQuyet !==undefined))) &&
    (monHoc.TheLoaiHocPhan === "Đại Cương"))
    {
      return true
    }
  });
  tkb_HKTruoc.forEach((item, i) => {
    if(((item.MaHocPhan === monHoc.MonHocTruoc)&& (monHoc.MonHocTruoc !==undefined)) ||
    ((item.MaHocPhan === monHoc.MonTienQuyet)&& (monHoc.MonTienQuyet !==undefined)))
    {
      return true
    }
  });
  tongMonHoc.forEach((monChuaHoc, i1) => {
    tkb_HKTruoc.forEach((monHocTruoc, i2) => {
        if((monChuaHoc.HK === 0) &&
        (((monHocTruoc.MaHocPhan === monChuaHoc.MonHocTruoc)&& (monChuaHoc.MonHocTruoc !==undefined)) ||
        ((monHocTruoc.MaHocPhan === monChuaHoc.MonTienQuyet)&& (monChuaHoc.MonTienQuyet !==undefined))))
            co += 1
    });
  });
            //console.log(tkb_HKTruoc);
//console.log(co);
if(co > 0) return false
else return true
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
            // console.log("sub: " + subject.MonHocTruoc);
          }
  });
  if(co <1) return true;
  return false
}

function danhSachMonHocLuaChon(tkb_HKTruoc,tongMonHoc,soTCToiDa,soMonToiDa)
{
//   const danhSachMonHoc = []
//   const tkb_kyNay = []
//   var tongTC = 0
//   if (tkb_HKTruoc.length >0)
// {  tkb_HKTruoc.forEach((monDaHoc, i1) => {
//     tongSoMon.forEach((monChuaHoc, i2) => {
//       if((((monDaHoc.MaHocPhan === monChuaHoc.MonHocTruoc)&& (monChuaHoc.MonHocTruoc !==undefined)) ||
//       ((monDaHoc.MaHocPhan === monChuaHoc.MonTienQuyet)&& (monChuaHoc.MonTienQuyet !==undefined))) &&
//       (monHoc.HK === 0))
//           {
//             danhSachMonHoc.push(monChuaHoc)
//             tongTC += monChuaHoc.SoTinChi
//           }
//     });
//   });
// }
// else {
// tongSoMon.forEach((monHoc, i) => {
//   if((i<tongSoMon+1) && (tongTC<tongSoTC+5))
//   {
//       danhSachMonHoc.push(monHoc)
//       tongTC += monChuaHoc.SoTinChi
//   }
// });
// }
// if(tongTC > soTCToiDa || danhSachMonHoc.length > soMonToiDa)
// {
//   danhSachMonHoc.forEach((monHoc, i) => {
//     if( tongSoTC(tkb_kyNay,soTCToiDa) &&
//         tongSoMon(tkb_kyNay,soMonToiDa))
//         tkb_kyNay.push(monHoc)
//   });
// }
// else {
//     tongSoMon.forEach((monHoc, i) => {
//       if(monHoc.HK === 0)
//           danhSachMonHoc.push(monHoc)
//     });
// }
}

const createSchedule = async (subjects,data) => {
  //chi so dieu chinh
  const soHocKyToiDa = typeof data.soHocKyToiDa !== 'undefined' ? data.soHocKyToiDa : 6
  const tongSoTinChiDaoTao = typeof data.tongSoTinChiDaoTao !== 'undefined' ? (data.tongSoTinChiDaoTao - 10) : (154 - 10)
  const soTinChiToiDa = Math.ceil(tongSoTinChiDaoTao/(soHocKyToiDa-1))
  const soMonHocToiDa =  typeof data.soMonHocToiDa !== 'undefined' ? data.soMonHocToiDa: 8
  const tyLeDaiCuong_ChuyenNganh = typeof data.tyLeDaiCuong_ChuyenNganh !== 'undefined' ? data.tyLeDaiCuong_ChuyenNganh : 0.9//tyLe DaiCuong/(ChuyenNganh+DaiCuong)
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
  var s
  tmp.forEach((item, i) => {
    if((item.YeuCauHocKy!== undefined) &&
    (hk === item.YeuCauHocKy))
    {
      s = item
      s.HK = hk
      tkb_moiKy.push(item)
    }
    else if((item.HK === 0) &&
       tongSoTC(tkb_moiKy,soTinChiToiDa) &&
       tongSoMon(tkb_moiKy,soMonHocToiDa) &&
       kiemTraTyLeMonHocTheoSoMonHoc(tkb_moiKy,tyLeDaiCuong_ChuyenNganh,dungSaiChoPhepTyLeMonHoc) &&
       kiemTraMonHocTruocVaMonTienQuyet(tkb_moiKy,item,tmp) &&
       (item.YeuCauHocKy === undefined)&&//tmp.slice(i+1,tmp.length)))
       (tkb.length > 0 ) && uTienMonHocTruoc(tkb[tkb.length -1],item,tmp))
        {
          s = item
          s.HK = hk
          tkb_moiKy.push(item)
        }
  });
  tmp.forEach((item, i) => {
      if((item.HK === 0) &&
      tongSoTC(tkb_moiKy,soTinChiToiDa) &&
      tongSoMon(tkb_moiKy,soMonHocToiDa) &&
      kiemTraMonHocTruocVaMonTienQuyet(tkb_moiKy,item,tmp) &&
      (item.YeuCauHocKy === undefined))
        {
          s = item
          s.HK = hk
          tkb_moiKy.push(item)
        }
  });
  tkb.push(tkb_moiKy)
  soHK = hk
}
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
