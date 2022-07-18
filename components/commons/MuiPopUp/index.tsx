import React from 'react';
import { Button, Popover, Tooltip } from '@material-ui/core';
import cn from 'classnames';
import View from '../View';
import { Callback } from '../../../redux/type';

const ContactFilter: React.FC<Props> = ({
  label,
  body,
  onShow,
  mini,
  isShow = true,
  labelClassName,
  anchorOrigin,
  transformOrigin,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    onShow && onShow(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onShow && onShow(false);
  };

  const open = Boolean(anchorEl) && isShow;
  const id = open ? 'simple-popover' : undefined;

  return (
    <Tooltip title={''}>
      <React.Fragment>
        <Button onClick={handleClick} className={cn('cmp-popover__button', labelClassName)}>
          {label}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: anchorOrigin?.vertical || 'bottom',
            horizontal: anchorOrigin?.horizontal || 'left',
          }}
          transformOrigin={{
            vertical: transformOrigin?.vertical || 'top',
            horizontal: transformOrigin?.horizontal || 'right',
          }}
          className={cn('cmp-popover', { 'is-mini': mini })}
        >
          <View
            className=""
            style={{ maxWidth: 380 }}
            onClick={(event) => {
              event.stopPropagation();
              !onShow && handleClose();
            }}
          >
            {body}
          </View>
        </Popover>
      </React.Fragment>
    </Tooltip>
  );
};

type PositionVerticalType = number | 'bottom' | 'top' | 'center';
type PositionHorizontalType = number | 'center' | 'left' | 'right';

type PopoverPosition = {
  vertical: PositionVerticalType;
  horizontal: PositionHorizontalType;
};

type Props = {
  label: string | React.ReactNode;
  labelClassName?: string;
  body: React.ReactNode;
  onShow?: Callback;
  mini?: boolean;
  isShow?: boolean;
  anchorOrigin?: PopoverPosition;
  transformOrigin?: PopoverPosition;
};

export default ContactFilter;
