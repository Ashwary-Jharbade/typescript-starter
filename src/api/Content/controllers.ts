import fs from 'fs';
import { Request, Response } from 'express';
import { apiResponse, httpConstants } from '../../utils/resuables';
import { properties } from './accessProperties';
import ContentModel from './schema';
import { save, find, findAll, push } from '../../utils/db';
import Mongoose from 'mongoose';

const createContent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const contentInstance = body;
    const data = await save(ContentModel, contentInstance);
    const code = httpConstants.created;
    return res
      .status(code)
      .json(apiResponse(code, 'Content added successfully', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res
      .status(code)
      .json(apiResponse(code, `Unable to add content: ${error}`, []));
  }
};

const addContent = async (req: Request, res: Response) => {
  try {
    const { id, episodeId } = req.params;
    const query = { _id: id, 'episodes._id': episodeId };
    const body = req.body;
    const { videoPath, quality } = body;
    if (!videoPath && !quality) {
      throw 'Unable to add content';
    }
    const payload = {
      'episodes.$.video': { videoPath, quality }
    };
    const data = await push(ContentModel, query, payload);
    const code = httpConstants.created;
    return res
      .status(code)
      .json(apiResponse(code, 'Content added successfully', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res
      .status(code)
      .json(apiResponse(code, `Unable to add content: ${error}`, []));
  }
};

const streamContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const query = { 'episodes.video._id': id };
    // const data = await find(ContentModel, query, {});
    const data = await ContentModel.aggregate([
      {
        $facet: {
          record: [
            {
              $match: {
                'episodes.video._id': new Mongoose.Types.ObjectId(id)
              }
            }
          ]
        }
      },
      { $unwind: { path: '$record' } },
      { $project: { record: '$record.episodes.video' } },
      { $unwind: { path: '$record' } },
      { $unwind: { path: '$record' } },
      { $match: { 'record._id': new Mongoose.Types.ObjectId(id) } }
    ]);
    // const arr: any[] = [];
    // data?.episodes?.forEach((epi: any) => {
    //   epi?.video?.forEach((item: any) => {
    //     const { _id } = item;
    //     if (_id.toString() === id) {
    //       arr.push(item);
    //     }
    //   });
    // });
    // const videoPath = arr[0].videoPath;
    const videoPath = data[0].record.videoPath;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    const code = httpConstants.not_found;
    return res.status(code).json(apiResponse(code, 'Unable to stream content'));
  }
};

const findSingleMediaContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = { _id: id };
    const data = await find(ContentModel, query, properties);
    const code = httpConstants.success;
    return res.status(code).json(apiResponse(code, 'Found content', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res
      .status(code)
      .json(apiResponse(code, 'Unable to find media content'));
  }
};

const findAllMediaContent = async (req: Request, res: Response) => {
  try {
    const data = await findAll(ContentModel, {}, properties);
    const code = httpConstants.success;
    return res.status(code).json(apiResponse(code, 'Found content', data));
  } catch (error) {
    const code = httpConstants.not_found;
    return res
      .status(code)
      .json(apiResponse(code, 'Unable to find any content'));
  }
};

export {
  createContent,
  streamContent,
  findSingleMediaContent,
  findAllMediaContent,
  addContent
};
