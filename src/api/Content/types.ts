interface IContent {
  title: string;
  season?: number;
  summary: string;
  contentOrigin: string;
  contentCertificate?: [
    {
      certificateType: string;
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  rating?: [
    {
      sourceProvider: string;
      score: number;
      totalScore: number;
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  thumnails?: [
    {
      thumnailPath: string;
      screenSize: string;
      screenPixelRation: string;
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  mediaType: string;
  genres: [string];
  startDate: Date;
  endDate: Date;
  cast?: [
    {
      artistId: string;
      role: string;
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  productionHouse?: [
    {
      productionHouseId: string;
      role: string;
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  episodes?: [
    {
      title: string;
      runTime: string;
      videoPath: string;
      subtitle?: [
        {
          language: string;
          transcriptPath: string;
          isActive?: boolean;
          createdAt: Date;
          updatedAt: Date;
        }
      ];
      audio?: [
        {
          language: string;
          audioPath: string;
          isActive?: boolean;
          createdAt: Date;
          updatedAt: Date;
        }
      ];
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  trailers?: [
    {
      title: string;
      runTime: string;
      videoPath: string;
      subtitle?: [
        {
          language: string;
          transcriptPath: string;
          isActive?: boolean;
          createdAt: Date;
          updatedAt: Date;
        }
      ];
      audio?: [
        {
          language: string;
          audioPath: string;
          isActive?: boolean;
          createdAt: Date;
          updatedAt: Date;
        }
      ];
      isActive?: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  accessType: string;
  isActive?: boolean;
}

export { IContent };
