import jwtDecode from 'jwt-decode'

export default function Profile() {

    let decoded = localStorage.getItem('userToken')
    let incodedToken = jwtDecode(decoded)

    // console.log(incodedToken);


    return <>
        <h1>Hello : {incodedToken.name} </h1>
        <h5>Hello : {incodedToken.id} </h5>
    </>
}
