import { createNewImage } from '../../controllers/image.controller';
import { Resolver, Authorized, Mutation, Arg, Query } from 'type-graphql';
import { Image, ImageModel } from '../../models/image.model';


@Resolver(of => Image)
export class ImageResolver {

  @Authorized()
  @Mutation(returns => Image)
  async addImage(
    @Arg("path") path: string,
    @Arg("alternateText", { nullable: true }) alternateText: string,
    @Arg("hasThumbnail", { nullable: true }) hasThumbnail: boolean
  ): Promise<Image | undefined> {
    const newImage = await createNewImage({
      path,
      alternateText,
      hasThumbnail
    });
    console.log(newImage);
    return newImage;
  }

  @Authorized()
  @Query(returns => [Image])
  async allImages(): Promise<Image[]> {
    return await ImageModel.find({});
  }
}