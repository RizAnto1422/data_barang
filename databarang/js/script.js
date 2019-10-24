
DatadanHasil();

function DatadanHasil() { 
    $.ajax({
        url: "http://localhost/data_barang/rest-server/api/data_barang",
        type: "get",
        dataType: "json",
        data: {
            
        },
        success: function(respon){
            // console.log(respon)
            if (respon.status == true){
                let datahasil = respon.data;
                // console.log(datahasil);
                $.each(datahasil, function(i, data) {
                    $('#list-daftar').append(`
                    <tr class="text-center">
                        <td class="text-capitalize font-weight-bold">`+data.nama+`</td>
                        <td>`+data.kode+`</td>
                        <td>`+data.harga+`</td>
                        <td class="informasinya ">
                            <a href="#" class="card-link text-success font-weight-bold" data-toggle="modal" data-target="#ModalEdit" data-id="`+data.id+`" id="tombol-ubah">Ubah</a>
                            <a href="#" class="card-link text-danger font-weight-bold" data-toggle="modal" data-target="#ModalHapus" data-id="`+data.id+`" id="tombol-hapus">Hapus</a>
                        </td>
                    </tr>
                    `);
                }); 
                
                
            }
        },
        
    });
}


$('#hasil-tambahnya').on('click', function(){
    $('#list-daftar').html('');
    $('#informasi-hasil').html('');
    
    $.ajax({
        url: "http://localhost/data_barang/rest-server/api/data_barang",
        type: "post",
        dataType: "json",
        data: {
            'id': $('#tambah-id').val(),
            'nama': $('#tambah-nama').val(),
            'kode': $('#tambah-kode').val(),
            'deskripsi':$('#tambah-deskripsi').val(),
            'stok': $('#tambah-stok').val(),
            'harga': $('#tambah-harga').val(),
            'berat': $('#tambah-berat').val(),
        },
        success: function(res){
            // console.log(res);
           
                let pesan = res.message;
                $('#informasi-hasil').append('<h4 class="text-capitalize">add success</h4>')

                
                DatadanHasil();
                
            }
            
        })
})



$('#tombol-tambahcoba').on('click', function(){
    $('#tambah-id').val('');
    $('#tambah-nama').val('');
    $('#tambah-kode').val('');
    $('#tambah-deskripsi').val('');
    $('#tambah-stok').val('');
    $('#tambah-harga').val('');
    $('#tambah-berat').val('');    
})   


// disable button tambah
$(function () {
    $('#tambah-kode' && '#tambah-nama' && '#tambah-stok' && '#tambah-harga' && '#tambah-berat').on("change", function() {
        if ($(this).val() == '') {
            $('#hasil-tambahnya').prop('disabled', true);
        } else {
            $('#hasil-tambahnya').prop('disabled', false);
        }
    });
});
// tutup disable button tambah

$('#list-daftar').on('click','#tombol-ubah', function(){
    $.ajax({
        url:'http://localhost/data_barang/rest-server/api/data_barang',
        dataType:'json',
        type:'get',
        data:{
            'key':'data123',
            'id': $(this).data('id')
        },
        success: function(respon){
                // console.log(respon)
            HasilEdit();


            function HasilEdit(){
                if (respon.status == true){
                    let isi = respon.data[0];
                    $('#BodyEdit').html(`

                      <div class="container-fluid">
                <div class="modal-body">
                  <div class="d-flex flex-column">

                    <div class="d-flex flex-row-reverse "> 
                        <input type="text" class="form-control text-biru kotak-idnya position-absolute" id="hasil-id-edit" disabled value="`+isi.id+`">
                    </div>
                    <div class="row">
                        <div class="form-group ket-nya">
                            <label for="usr" >kode:</label>
                        </div>

                        <input type="text" class="form-control kotak-isi text-biru input-khusus" id="hasil-kode" value="`+isi.kode+`">
                    </div>
                    <div class="row">
                        <div class="form-group ket-nya">
                            <label for="usr" >Nama:</label>
                        </div>

                        <input type="text" class="form-control kotak-isi text-biru" id="hasil-nama" value="`+isi.nama+`">
                    </div>
                    <div class="row">
                        <div class="form-group ket-nya">
                            <label for="usr" >Deskripsi:</label>
                        </div>

                        <textarea class="form-control kotak-isi text-biru" id="hasil-deskripsi" >`+isi.deskripsi+`</textarea>
                    </div>
                    <div class="row">
                        <div class="form-group ket-nya">
                            <label for="usr" >Stok:</label>
                        </div>

                        <input type="text" class="form-control kotak-isi text-biru input-khusus" id="hasil-stok" value="`+isi.stok+`">
                    </div>
                    <div class="row">
                        <div class="form-group ket-nya">
                            <label for="usr" >Harga:</label>
                        </div>

                        
                        <div class="input-group input-khusus">
                            <div class="input-group-append ">
                                <span class="input-group-text text-biru rounded-left">Rp.</span>
                            </div>
                            <input type="text" class="form-control kotak-isi text-biru" aria-label="Amount (to the nearest dollar)" id="hasil-harga" value="`+isi.harga+`">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group ket-nya">
                            <label for="usr" >Berat:</label>
                        </div>

                        
                        <div class="input-group input-khusus">
                          <input type="text" class="form-control kotak-isi text-biru" aria-label="Amount (to the nearest dollar)" id="hasil-berat" value="`+isi.berat+`">
                            <div class="input-group-append">
                              <span class="input-group-text text-biru">gram</span>
                            </div>
                        </div>
                        
                    </div>
                  </div>
                </div>
                    `);
                }
            }
            
        }
        
    })
})

$('#simpan-putnya').on('click',function(){
    $('#list-daftar').html('');
    $('#informasi-hasil').html('');
    $.ajax({
        url:'http://localhost/data_barang/rest-server/api/data_barang',
        dataType:'json',
        type: 'put',
        data:{
            'id': $('#hasil-id-edit').val(),
            'nama': $('#hasil-nama').val(),
            'kode': $('#hasil-kode').val(),
            'deskripsi':$('#hasil-deskripsi').val(),
            'stok': $('#hasil-stok').val(),
            'harga': $('#hasil-harga').val(),
            'berat': $('#hasil-berat').val(),
        },
        success: function(res){
            // console.log(res);
           
                let pesan = res.message;
                $('#informasi-hasil').append('<h4 class="text-capitalize">'+pesan+'</h4>')

                
                DatadanHasil();
                
            }
            
    })

    // $.put = function(){
 
    //     if ( respon.status == true ){
    //       type = callback,
    //       callback = data,
    //       data = {
    //         'key':'data123',
    //         'id':$('#hasil-id').val(),
    //         'nama':$('#hasil-nama').val(),
    //         'nis':$('#hasil-nis').val(),
    //         'kelas':$('#hasil-kelas').val(),
    //         'agama':$('#hasil-agama').val()
    //       }
    //     }
       
    //     return $.ajax({
    //       url: 'http://localhost/latihan/rest-server/api/mahasiswa',
    //       type: 'PUT',
    //       success: callback,
    //       data: data,
    //       contentType: type
    //     });
    //   }
});



$('#list-daftar').on('click','#tombol-hapus',function(){
            $('#BodyHapus').html('');
            // $('#informasi-hasil').html('');
           
            $.ajax({
                url:'http://localhost/data_barang/rest-server/api/data_barang',
                dataType:'json',
                type:'get',
                data:{
                    'key':'data123',
                    'id': $(this).data('id')
                },
                success: function(respon){
                    if (respon.status == true){
                        let isi = respon.data[0];
                    $('#BodyHapus').append(`
                    <div classs="container-fluid"> 
                        <div class="row text-center">
                            <h5 class="text-danger text-hapus">Apakah Data Ingin di Hapus ? </h5> 
                            <input type="text" id="id-untuk-hapus" class="id-hapus font-weight-bold" disabled value="`+isi.id+`">
                        </div>
                    </div>
                    `);
                    }
                        
                }
            })
        
})



$('#tombolHapusData').on('click',function(){
    $('#list-daftar').html('');
    $('#informasi-hasil').html('');
   $.ajax({
        url:'http://localhost/data_barang/rest-server/api/data_barang',
        dataType:'json',
        type:'delete',
        data:{
            'key':'data123',
            'id': $('#id-untuk-hapus').val()
        },
        success: function(respon){
            let pesan = respon.message;
            $('#informasi-hasil').append('<h4 class="text-capitalize">'+pesan+'</h4>')

            DatadanHasil();
        }
   })
  
})

// $('#tombol-hapus').on('click', function(){
//     $.ajax({
//         url: "http://localhost/latihan/rest-server/api/mahasiswa",
//         type: "delete",
//         dataType: "json",
//         data: {
//             'key':'data123',
//             'id': $('#kode-id').html()
//         },
//         success: function(isi){
//         console.log(isi);
//         }
//     }); 
// })