<?php

class databarang_model extends CI_Model
{
    public function getDataBarang($id = null)
    {
        if( $id === null ){
            return $this->db->get('data_barang')->result_array();

        } else{
            return $this->db->get_where('data_barang', ['id' => $id])->result_array();
        }
    }

    public function deleteDataBarang($id)
    {
        $this->db->delete('data_barang', ['id' => $id]);
        return $this->db->affected_rows();
    }

    public function createDataBarang($data)
    {
        $this->db->insert('data_barang', $data);
        return $this->db->affected_rows();
    }

    public function updateDataBarang($data, $id)
    {
        $this->db->update('data_barang', $data, ['id' => $id]);
        return $this->db->affected_rows();
    }

}