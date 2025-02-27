const config = {
    env: {
      apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
      databaseId: process.env.NEXT_PUBLIC_DATABASE_ID!,
      collactionUserId: process.env.NEXT_PUBLIC_COLLACTION_USERS_ID!,
      collactionKickId: process.env.NEXT_PUBLIC_COLLACTION_KICKS_ID!,
      collactionAdvertisementsId: process.env.NEXT_PUBLIC_COLLACTION_ADVERTISEMENTS_ID!,
      collactionReviewsId: process.env.NEXT_PUBLIC_COLLACTION_REVIEWS_ID!,
      collactionAdvertisementsListingId: process.env.NEXT_PUBLIC_COLLACTION_ADVERTISEMENTS_Lisitng_ID!,
      collactionCartId: process.env.NEXT_PUBLIC_COLLACTION_CART_ID!,
    },
  };
  
  export default config;
  