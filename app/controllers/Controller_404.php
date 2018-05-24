<?php
class Controller_404 extends Controller {
    function __construct()
    {
        $this->view = new View();
    }
    public function action_index($params) {
        $this->view->generate('404_view.php', 'template_view.php');
    }
}