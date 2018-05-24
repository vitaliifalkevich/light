<main class="col-md-4 text-center offset-4" style="margin-top: 90px;">
    <h1>Форум для всех</h1>
    <p class="lead">Чтобы оставить свое сообщение, необходимо авторизироваться через Google+</p>
    <p class="lead">
        <a href="/main" class="btn btn-lg btn-secondary">Просмотреть переписку пользователей</a>
    </p>
</main>

<?php
echo $_COOKIE["isLogin"];
echo "<p></p>";
echo $_COOKIE["userName"];
echo "<p></p>";
echo $_COOKIE["userImage"];
echo "<p></p>";
echo $_COOKIE["userEmail"];
echo "<p></p>";
echo $_COOKIE["userToken"];
?>
