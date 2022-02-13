import Mongoose from 'mongoose';

const contentSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    season: {
      type: Number,
      required: false
    },
    summary: {
      type: String,
      required: true
    },
    contentOrigin: {
      type: String,
      requied: true
    },
    contentCetificate: [
      {
        certificateType: {
          type: String,
          requied: true
        },
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    rating: [
      {
        sourceProvider: {
          type: String,
          required: true
        },
        score: {
          type: Number,
          required: true
        },
        totalScore: {
          type: Number,
          required: true
        },
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    thumnails: [
      {
        thumnailPath: {
          type: String,
          requied: true
        },
        screenSize: {
          type: String,
          enum: [
            'mobile',
            'large-mobile',
            'tablet',
            'large-tablet',
            'laptop',
            'desktop',
            'large-monitor'
          ],
          requied: true
        },
        screenPixelRation: {
          type: String,
          enum: ['1x', '2x', '4x'],
          requied: true
        },
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    mediaType: {
      type: String,
      enum: ['show', 'movie', 'documentry', 'anime', 'cartoon', 'education'],
      default: 'show'
    },
    genres: {
      type: [String],
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    cast: [
      {
        artistId: {
          type: String,
          required: true
        },
        role: {
          type: String,
          required: true
        },
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    productionHouse: [
      {
        productionHouseId: {
          type: String,
          requied: true
        },
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    episodes: [
      {
        title: {
          type: String,
          required: true
        },
        runTime: {
          type: String,
          required: true
        },
        subtitle: [
          {
            language: {
              type: String,
              requied: true
            },
            transcriptPath: {
              type: String,
              requied: true
            },
            isActive: {
              type: Boolean,
              required: false,
              default: true
            },
            createdAt: {
              type: Date,
              required: true
            },
            updatedAt: {
              type: Date,
              required: true
            }
          }
        ],
        audio: [
          {
            language: {
              type: String,
              requied: true
            },
            audioPath: {
              type: String,
              requied: true
            },
            isActive: {
              type: Boolean,
              required: false,
              default: true
            },
            createdAt: {
              type: Date,
              required: true
            },
            updatedAt: {
              type: Date,
              required: true
            }
          }
        ],
        video: [
          {
            videoPath: {
              type: String,
              required: true
            },
            quality: {
              type: String,
              required: true
            }
          }
        ],
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    trailers: [
      {
        title: {
          type: String,
          required: true
        },
        runTime: {
          type: String,
          required: true
        },
        subtitle: [
          {
            language: {
              type: String,
              requied: true
            },
            transcriptPath: {
              type: String,
              requied: true
            },
            isActive: {
              type: Boolean,
              required: false,
              default: true
            },
            createdAt: {
              type: Date,
              required: true
            },
            updatedAt: {
              type: Date,
              required: true
            }
          }
        ],
        audio: [
          {
            language: {
              type: String,
              requied: true
            },
            audioPath: {
              type: String,
              requied: true
            },
            isActive: {
              type: Boolean,
              required: false,
              default: true
            },
            createdAt: {
              type: Date,
              required: true
            },
            updatedAt: {
              type: Date,
              required: true
            }
          }
        ],
        videoPath: {
          type: String,
          required: true
        },
        isActive: {
          type: Boolean,
          required: false,
          default: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        updatedAt: {
          type: Date,
          required: true
        }
      }
    ],
    accessType: {
      type: String,
      enum: ['mobile', 'basic', 'standard', 'premium'],
      requied: true
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

const ContentModel = Mongoose.model('content', contentSchema);
export default ContentModel;
