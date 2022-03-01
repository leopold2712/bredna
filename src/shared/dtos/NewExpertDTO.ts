export type NewExpertDTO = {
  name: string;
  title: string;
  about: string;
  video: string | null;
  video_thumbnail: string | null;
  skills: [
    {
      id: number;
      name: string;
    },
  ];
  languages: [
    {
      id: number;
      iso: string;
      name: string;
    },
  ];
  certificates: [];
  is_hub_owner: boolean;
  share_link: string;
  id: number;
  first_name: string;
  last_name: string;
  thumbnail: string | null;
  reviews_count: number;
  avg_rating: number | null;
  created_at: string;
  expert_id: number;
};
