import ScheduleModel from '../models/schedule.models';
//import TreeNodeModel  from '../../utility/models/treenode.models';
import {
  ScheduleStatus
} from '../commons/schedule.status';

function convertArrayToString(filters) {
  let string = "";
  filters.map(element => {
    string += element + ' ';
  });
  return string;
};
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
function kiemTraTyLeMonHocTheoSoMonHoc(tkb_kyNay,tyLe,dungSaiChoPhepTyLeMonHoc){
  if(tyLe === 0) return true
  var daiCuong = 0
  var daiCuong2 = 0
  var chuyenNganh = 0
  tkb_kyNay.forEach((item, i) => {
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
function kiemTraTyLeMonHocTheoSoTinChi(tkb_kyNay,tyLe,dungSaiChoPhepTyLeMonHoc){
  if(tyLe === 0) return true
  var daiCuong = 0
  var daiCuong2 = 0
  var chuyenNganh = 0
  tkb_kyNay.forEach((item, i) => {
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
function kiemTraMonHocTruocVaMonTienQuyet(tkb_kyNay,monHoc,tongMonHocCoIndex){
  var co = 0
  tkb_kyNay.forEach((item, i) => {
    if(((item.MaHocPhan === monHoc.MonHocTruoc)&& (monHoc.MonHocTruoc !==undefined)) ||
    ((item.MaHocPhan === monHoc.MonTienQuyet)&& (monHoc.MonTienQuyet !==undefined)))
        co +=1
  });
  tongMonHocCoIndex.forEach((item, i) => {
    if((((item.MaHocPhan === monHoc.MonHocTruoc)&& (monHoc.MonHocTruoc !==undefined)) ||
    ((item.MaHocPhan === monHoc.MonTienQuyet)&& (monHoc.MonTienQuyet !==undefined)))
    && item.HK === 0)
          {
            co +=1
          }
  });
  if(co <1) return true;
  return false
}
function danhIndexChoMonHoc(subjects){
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
  return tmp
}
function khoiTaoTKBHocKyDau(tongMonHocCoIndex,soTCToiDa,soMonToiDa,tyLe,dungSaiChoPhepTyLeMonHoc) {
    const tkb_kyNay = []
    tongMonHocCoIndex.forEach((monHoc, i) => {
      if(monHoc.index === 1 && tongSoTC(tkb_kyNay,soTCToiDa) &&
       tongSoMon(tkb_kyNay,soMonToiDa) &&
       kiemTraTyLeMonHocTheoSoTinChi(tkb_kyNay,tyLe,dungSaiChoPhepTyLeMonHoc)){
        monHoc.HK = 1
        tkb_kyNay.push(monHoc)
      }
    });
    tongMonHocCoIndex.forEach((monHoc, i) => {
        if(monHoc.HK === 0 &&
          tongSoTC(tkb_kyNay,soTCToiDa) && tongSoMon(tkb_kyNay,soMonToiDa)&&
          kiemTraMonHocTruocVaMonTienQuyet(tkb_kyNay,monHoc,tongMonHocCoIndex))
        {
            monHoc.HK = 1
            tkb_kyNay.push(monHoc)
        }
    });
    return tkb_kyNay
}
function khoiTaoTKBMoiHocKy(tongMonHocCoIndex,soTCToiDa,soMonToiDa,tyLe,dungSaiChoPhepTyLeMonHoc){
  const danhSachMonHoc = []
  const tkb_kyNay = []
  var soHkDaDuocTao = chiSoToiDaHocKy(tongMonHocCoIndex) + 1
  tongMonHocCoIndex.forEach((monHoc, i) => {
      if(monHoc.HK === 0 && monHoc.index <= soHkDaDuocTao &&
        tongSoTC(tkb_kyNay,soTCToiDa) && tongSoMon(tkb_kyNay,soMonToiDa)&&
        kiemTraMonHocTruocVaMonTienQuyet(tkb_kyNay,monHoc,tongMonHocCoIndex) &&
        kiemTraTyLeMonHocTheoSoTinChi(tkb_kyNay,tyLe,dungSaiChoPhepTyLeMonHoc))
      {
          monHoc.HK = soHkDaDuocTao
          tkb_kyNay.push(monHoc)
      }
  });
  tongMonHocCoIndex.forEach((monHoc, i) => {
      if(monHoc.HK === 0 &&
        tongSoTC(tkb_kyNay,soTCToiDa) && tongSoMon(tkb_kyNay,soMonToiDa)&&
        kiemTraMonHocTruocVaMonTienQuyet(tkb_kyNay,monHoc,tongMonHocCoIndex))
      {
          monHoc.HK = soHkDaDuocTao
          tkb_kyNay.push(monHoc)
      }
  });
  return tkb_kyNay
}
// const createSchedule = async (subjects,data) => {
//   const soHocKyToiDa = typeof data.soHocKyToiDa !== 'undefined' ? data.soHocKyToiDa : 6
//   const tongSoTinChiDaoTao = typeof data.tongSoTinChiDaoTao !== 'undefined' ? (data.tongSoTinChiDaoTao - 10) : (154 - 10)
//   const soTinChiToiDa = Math.ceil(tongSoTinChiDaoTao/(soHocKyToiDa-1))
//   const soMonHocToiDa =  typeof data.soMonHocToiDa !== 'undefined' ? data.soMonHocToiDa: 8
//   const tyLeDaiCuong_ChuyenNganh = typeof data.tyLeDaiCuong_ChuyenNganh !== 'undefined' ? data.tyLeDaiCuong_ChuyenNganh : 0//tyLe DaiCuong/(ChuyenNganh+DaiCuong)
//   const dungSaiChoPhepTyLeMonHoc = typeof data.dungSaiChoPhepTyLeMonHoc !== 'undefined' ? data.dungSaiChoPhepTyLeMonHoc : 0.2//dung sai voi tyLe DaiCuong/(ChuyenNganh+DaiCuong)
//   //////////////////
//   var soHK = 0
//   const tkb = []
//   var tongSoMontkbMoiKy = 1
//   //danh index cho mon hoc
//   const danhSachMonHocDaDanhIndex = danhIndexChoMonHoc(subjects)
//   //tao tkb hoc ky 1
//   const thoiKhoaBieuHKDauTien = khoiTaoTKBHocKyDau(danhSachMonHocDaDanhIndex,soTinChiToiDa,soMonHocToiDa,tyLeDaiCuong_ChuyenNganh,dungSaiChoPhepTyLeMonHoc);
//   tkb.push(thoiKhoaBieuHKDauTien)
//   while (soHK < soHocKyToiDa) {
//   var tkb_moiKy = khoiTaoTKBMoiHocKy(danhSachMonHocDaDanhIndex,soTinChiToiDa,soMonHocToiDa,tyLeDaiCuong_ChuyenNganh,dungSaiChoPhepTyLeMonHoc)
//   if(tkb_moiKy.length !== 0)
//     tkb.push(tkb_moiKy)
//   soHK +=1
// }
//   // tkb.forEach((hocKy, i) => {
//   //   hocKy.forEach((monHoc, i) => {
//   //   const result =  ScheduleModel.create(monHoc);
//   //   });
//   // });
// return tkb
// }
const createSchedule = async (data) => {
  const result = await ScheduleModel.create(data);
  return result;
}
const getSchedule = async (MaKhoa) => {
  var schedules = await ScheduleModel.find({
    MaKhoa: MaKhoa
  });
return schedules
};
const getAllSchedules = async (page, limit) => {
  var schedules = await ScheduleModel
    .find()
    .limit(limit)
    .skip(limit * page);
  return schedules;
};
const insertSchedule = async (data) => {
  const result = await ScheduleModel.create(data);
}

const updateSchedule = async (MaKhoa, data) => {
  const result = await ScheduleModel.updateOne({
    MaKhoa: MaKhoa
},
    { ...data });
if (result.n === result.nModified) return true;
return false;
};

export default {
  createSchedule,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  convertArrayToString,
  insertSchedule
};
