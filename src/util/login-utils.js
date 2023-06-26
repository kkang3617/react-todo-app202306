
// 로그인 한 유저의 데이터 객체를 반환하는 함수
export const getLoginUserInfo = () => {
    return {
        token: localStorage.getItem('ACCESS_TOKEN'),
        username: localStorage.getItem('LOGIN_USERNAME'),
        role: localStorage.getItem('USER_ROLE'),
    };
};

//로그인 여부를 확인하는 함수
//const isLogin = () => {
//  const token = localStorage.getItem('ACCESS_TOKEN');
//  if(token === null) return false;
    // return true;

export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN') // !!논리타입으로 변경
                    // token 존재하면 true 존재하지 않으면 false

//export 외부에서 함수 사용가능하게함.
