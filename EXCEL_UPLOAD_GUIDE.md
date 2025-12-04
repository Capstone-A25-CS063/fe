# 📊 Excel Upload Guide - FileUpload Component

## Status ✅
- **xlsx library**: Installed (v0.18.5)
- **File formats supported**: `.csv`, `.xlsx`, `.xls`
- **Max file size**: Tidak ada batasan (disesuaikan dengan backend)

## Penyebab Error "Gagal membaca file Excel"

### 1. **File Excel Corrupted** ❌
**Solusi:**
- Coba buat file Excel baru di Microsoft Excel atau Google Sheets
- Copy data dari file lama ke file baru
- Simpan dengan format `.xlsx`

### 2. **Format File Tidak Valid** ❌
**Solusi:**
- Pastikan file berakhir dengan `.xlsx` atau `.xls`
- Jangan gunakan format `.xlsm` (Excel dengan macro)
- Jangan gunakan format `.ods` (OpenDocument)

### 3. **Sheet Kosong atau Tidak Ada Data** ❌
**Solusi:**
- Pastikan file Excel memiliki minimal 1 sheet dengan data
- Pastikan ada header di baris pertama
- Pastikan ada minimal 1 baris data

### 4. **File Terlalu Besar** ❌
**Solusi:**
- Kurangi jumlah baris dalam file
- Gunakan file Excel dengan sheet pertama yang berisi data
- Hapus sheet yang tidak diperlukan

## Cara Debug

### 1. Buka Browser Console
```
F12 → Console Tab
```

### 2. Lihat Log yang Ditampilkan

**Jika upload CSV:**
```
📁 File Details: {name: "data.csv", type: "text/csv", size: 2048, isCSV: true, isXLSX: false}
📄 Parsing CSV file...
✅ CSV parsed successfully: 5 rows
```

**Jika upload Excel:**
```
📁 File Details: {name: "data.xlsx", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", size: 5120, isCSV: false, isXLSX: true}
📊 Parsing Excel file...
📦 ArrayBuffer size: 5120 bytes
✅ XLSX library loaded
📖 Sheet names: ["Sheet1"]
✅ Excel parsed successfully: 10 rows
```

### 3. Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Modul xlsx tidak tersedia" | Package belum install | Run: `npm install xlsx --save` |
| "File Excel tidak memiliki sheet" | Excel kosong | Buat sheet baru dengan data |
| "Sheet kosong atau tidak ada data" | Sheet tidak punya data | Tambahkan data di sheet |
| "Tidak dapat membaca sheet" | File corrupted | Buat file baru |

## File Format Template

### CSV Format
```
nama_nasabah,nomor_telepon,age,job,marital
John Doe,081234567890,30,Engineer,Single
Jane Smith,081987654321,28,Manager,Married
```

### Excel Format (Sheet1)
| nama_nasabah | nomor_telepon | age | job | marital |
|---|---|---|---|---|
| John Doe | 081234567890 | 30 | Engineer | Single |
| Jane Smith | 081987654321 | 28 | Manager | Married |

## Troubleshooting Checklist

- [ ] File format benar (.csv atau .xlsx)?
- [ ] File tidak corrupted (bisa dibuka di Excel)?
- [ ] File memiliki data (tidak kosong)?
- [ ] Browser console tidak menunjukkan error?
- [ ] `npm list xlsx` menunjukkan package terinstall?
- [ ] Dev server running (`npm run dev`)?

## Browser Console Debugging

Jika masih error, buka console dan cari:

```javascript
// Test XLSX library secara langsung
import('xlsx').then(mod => {
  console.log('XLSX loaded:', mod);
}).catch(err => {
  console.error('XLSX error:', err);
});
```

## Frontend Update (v1.1)

✅ Perubahan di FileUpload.jsx:
- Added detailed console logging untuk debugging
- Better error messages dengan informasi lebih detail
- Validasi file yang lebih ketat
- CSV parsing dengan support untuk empty lines
- Error handling untuk reader operations

