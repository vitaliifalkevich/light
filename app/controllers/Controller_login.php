<?php
class Controller_login extends Controller
{
    function __construct() {
        if($_COOKIE["isLogin"]) {
            header('Location:/main');
            exit();
        }
        $this->view = new View();
    }

    function action_index($params)
    {
        $this->view->generate('login_view.php', 'template_view.php', ['isLogin'=>'Не авторизирован']);

    }
}