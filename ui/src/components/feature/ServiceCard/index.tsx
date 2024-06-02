import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

interface IServiceCardProps {
  image?: string;
  title: string;
  subTitle?: string;
  onCardClick: () => void;
  width?: string;
  selected?: boolean;
}

const ServiceCard = (props: IServiceCardProps) => {
  const { image, onCardClick, subTitle, title, width, selected } = props;
  return (
    <Card
      sx={{
        width: width ? width : 330,
        flex: 'none',
        boxShadow: selected ? '0px 0px 20px gray' : '',
      }}
    >
      <CardActionArea onClick={onCardClick}>
        <CardMedia
          sx={{ height: 140 }}
          image={image}
          title="buySubscriptionImage"
        />
        <CardContent sx={{ minHeight: 160 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ServiceCard;
