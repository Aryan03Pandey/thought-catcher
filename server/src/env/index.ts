import { int, z } from "zod";
const envSchema = z.object({
  // DB: z.object({
  //   HOST: z.string(),
  //   USER: z.string(),
  //   PASSWORD: z.string(),
  //   DATABASE: z.string(),
  // }),
  google: z.object({
    oauth2_endpoint: z
      .literal("https://accounts.google.com/o/oauth2/v2/auth")
      .default("https://accounts.google.com/o/oauth2/v2/auth"),
    userinfo_endpoint: z
      .literal("https://www.googleapis.com/oauth2/v3/userinfo")
      .default("https://www.googleapis.com/oauth2/v3/userinfo"),
    web_client_id: z.string(),
    // expo_client_id: z.string(),
    android_client_id: z.string(),
    client_secret: z.string(),
    redirect_uri: z.string(),
    
    scope: z.literal("email profile").default("email profile"),
  }),
  frontend_url: z.string(),
  jwt_secret: z.string(),
  mongo_uri: z.string(),
  max_tags_per_user: z.number(),
  max_thoughtbox_per_user: z.number(),
  max_tags_per_thought: z.number(),
});

const parsed = envSchema.safeParse({
  ...process.env,
  // // DB: {
  // //   HOST: process.env.POSTGRES_HOST,
  // //   USER: process.env.POSTGRES_USER,
  // //   PASSWORD: process.env.POSTGRES_PASSWORD,
  // //   DATABASE: process.env.POSTGRES_DB,
  // // },
  google: {
    web_client_id: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    // expo_client_id: process.env.GOOGLE_EXPO_CLIENT_ID,
    android_client_id: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.EXPO_PUBLIC_GOOGLE_WEB_REDIRECT_URI,
  },
  frontend_url: process.env.FRONTEND_URL,
  jwt_secret: process.env.JWT_SECRET,
  mongo_uri: process.env.MONGO_URI,
  max_tags_per_user: parseInt(process.env.MAX_TAGS_PER_USER || ""),
  max_thoughtbox_per_user: parseInt(process.env.MAX_THOUGHTBOX_PER_USER || ""),
  max_tags_per_thought: parseInt(process.env.MAX_TAGS_PER_THOUGHT || "")
});
let env: z.infer<typeof envSchema>;

if (parsed.success === false) {
  const errors = parsed.error.issues.reduce(
    (acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    },
    {} as Record<string, string>,
  );
  console.error("❌ Invalid environment variables:", errors);
  throw new Error("Invalid environment variables");
}
env = parsed.data;

export default env;
