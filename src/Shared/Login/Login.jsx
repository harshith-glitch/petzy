import React from "react";

const Login = () => {
  return (
    <div>
      <div class="main-wrapper account-wrapper">
        <div class="account-page">
          <div class="account-center">
            <div class="account-box">
              <form
                action="http://dreamguys.co.in/preclinic/template/index.html"
                class="form-signin"
              >
                <div class="account-logo">
                  <a href="dashboard">
                    <img src="assets/img/logo-dark.png" alt="" />
                  </a>
                </div>
                <div class="form-group">
                  <label>Username or Email</label>
                  <input type="text" autofocus="" class="form-control" />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control" />
                </div>
                <div class="form-group text-right">
                  <a href="">Forgot your password?</a>
                </div>
                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary account-btn">
                    Login
                  </button>
                </div>
                <div class="text-center register-link">
                  Don't have an account? <a href="signup">Register Now</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
