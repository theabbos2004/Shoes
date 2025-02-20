import { categoriesType, ReviewsType } from "@/types"

export const navList=[
    {
        label:"New Drops 🔥",
        route:"new-drop"
    },
    {
        label:"Men",
        route:"men"
    },
    {
        label:"Women",
        route:"women"
    }
]

export const getCategories=async():Promise<categoriesType[]>=>{
    return [
        {id:"1",title:"Running shoes",imageUrl:"https://cloud.appwrite.io/v1/storage/buckets/67acb5390015dbe3e578/files/67b4a4d30012fc57dc01/view?project=679dfb2800251828793f&mode=admin"},
        {id:"2",title:"Sports shoes",imageUrl:"https://cloud.appwrite.io/v1/storage/buckets/67acb5390015dbe3e578/files/67b4a9a6001d4df768bd/view?project=679dfb2800251828793f&mode=admin"},
        {id:"3",title:"Running shoes",imageUrl:"https://cloud.appwrite.io/v1/storage/buckets/67acb5390015dbe3e578/files/67b4a4d30012fc57dc01/view?project=679dfb2800251828793f&mode=admin"},
        {id:"4",title:"Sports shoes",imageUrl:"https://cloud.appwrite.io/v1/storage/buckets/67acb5390015dbe3e578/files/67b4a9a6001d4df768bd/view?project=679dfb2800251828793f&mode=admin"},
        {id:"5",title:"Running shoes",imageUrl:"https://cloud.appwrite.io/v1/storage/buckets/67acb5390015dbe3e578/files/67b4a4d30012fc57dc01/view?project=679dfb2800251828793f&mode=admin"}
    ]
}
