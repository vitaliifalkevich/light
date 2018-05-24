<?php
class Model_main extends Model
{
    public $db;
    function __construct()
    {
        $this->db = $db = Model::getDB();
    }
    public function get_data($limit, $offset, $sort_by = "created_time")
    {
         /*Делаем запрос на выборку всех задач*/
      $query = "SELECT tasks.id, tasks.title, users.userName, users.email, status.status  FROM `tasks` LEFT JOIN `users` ON tasks.user_id = users.id LEFT JOIN `status` ON tasks.status_id = status.id ORDER BY
        $sort_by ASC LIMIT ".$limit." OFFSET ".$offset;

        return $this->db->select($query);
    }
    function countRows() {
        $query = "SELECT * FROM tasks";
        return $this->db->numRows($query);
    }
    public function get_users() {
        $query = "SELECT id, userName, email FROM users";
        return $this->db->select($query);

    }
    public function fullTask($id) {
        $query = "SELECT tasks.id, tasks.title,tasks.description,tasks.image, users.userName, users.email, status.status  FROM `tasks` LEFT JOIN `users` ON tasks.user_id = users.id LEFT JOIN `status` ON tasks.status_id = status.id WHERE tasks.id=".$id;
        return $this->db->select($query);
    }
    /*public function getImage($id) {
        $query = "SELECT image FROM tasks WHERE id=".$id;
        return $this->db->select($query);
    }*/
    public function doQuery($query) {
        return $this->db->query($query);
    }
    public function getLastRecord() {
        return $this->db->lastRecord();
    }



}
