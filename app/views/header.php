<header>
    <div class="navbar navbar-dark bg-dark box-shadow">
        <a href="/"><div class="logo">
                <i class="fab fa-forumbee"></i>
                <span>Форум</span>
            </div></a>
        <div class="login">

            <a href='#' style="<?php echo !$_COOKIE["isLogin"]? 'display:none':'' ?>" onclick='signOut();'><i class='fas fa-sign-out-alt'></i> Выйти</a>
            <div class='g-signin2' style="<?php echo $_COOKIE["isLogin"]? 'display:none':'' ?>" data-onsuccess='onSignIn'></div>
        </div>
    </div>
</header>