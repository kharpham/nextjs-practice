interface Props {
  params: {
    id: number;
    photoId: number;
  };
}

const DetailPhotoPage = ({ params: { id, photoId } }: Props) => {
  return <div>DetailPhotoPage {photoId} of User {id}</div>;
};

export default DetailPhotoPage;
