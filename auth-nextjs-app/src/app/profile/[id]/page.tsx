export default function UserProfile({params}: any){
    return(
        <div>
            <h1 className="text-4xl ">Profile page: {params.id}</h1>
            <h1></h1>
        </div>
    )
}