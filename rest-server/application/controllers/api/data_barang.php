<?php
use Restserver\Libraries\REST_Controller;

defined('BASEPATH') OR exit('No direct script access allowed');


require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class data_barang extends Rest_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('databarang_model','databarang');

    }
    public function index_get()
    {
        $id = $this->get('id');
        if ($id === null){
            $databarang = $this->databarang->getdatabarang();
        } else {
            $databarang = $this->databarang->getdatabarang($id);
        }
        
        if($databarang){
            $this->response([
                'status' => TRUE,
                'data' => $databarang
            ], REST_Controller::HTTP_OK);
        } else {
            $this->response([
                'status' => false,
                'message' => 'id tidak ada.'
            ], REST_Controller::HTTP_NOT_FOUND);
        }
        
    }


    public function index_delete()
    {
        $id = $this->delete('id');

        if ($id === null) {
            $this->response([
                'status' => false,
                'message' => 'Usee id'
            ], REST_Controller::HTTP_BAD_REQUEST);
        } else {
            if($this->databarang->deletedatabarang($id) > 0){

                $this->response([
                    'status' => true,
                    'id' => $id,
                    'message' => 'delete success'
                ], REST_Controller::HTTP_OK);
            } else {
                $this->response([
                    'status' => false,
                    'message' => 'id not found !'
                ], REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }

    public function index_post()
    {
        $data =[
            'id' => $this->post('id'),
            'nama' => $this->post('nama'),
            'kode' => $this->post('kode'),
            'deskripsi' => $this->post('deskripsi'),
            'stok' => $this->post('stok'),
            'harga' => $this->post('harga'),
            'berat' => $this->post('berat')
        ];

        if($this->databarang->createdatabarang($data) > 0){
            $this->response([
                'status' => true,
                'message' => 'new databarang has been created.'
            ], REST_Controller::HTTP_CREATED);
        } else{
            $this->response([
                'status' => false,
                'message' => 'failed to create new data!'
            ], REST_Controller::HTTP_BAD_REQUEST);
        }
    }


    public function index_put()
    {
        $id = $this->put('id');
        $data =[
            'id' => $this->put('id'),
            'nama' => $this->put('nama'),
            'kode' => $this->put('kode'),
            'deskripsi' => $this->put('deskripsi'),
            'stok' => $this->put('stok'),
            'harga' => $this->put('harga'),
            'berat' => $this->put('berat')
        ];


        if($this->databarang->updatedatabarang($data, $id) > 0){
            $this->response([
                'status' => true,
                'message' => 'update success'
            ], REST_Controller::HTTP_OK);
        } else{
            $this->response([
                'status' => false,
                'message' => 'failed to update!'
            ], REST_Controller::HTTP_BAD_REQUEST);
        }
    }


}

