import { Button, FormControl, FormHelperText, Grid, InputLabel, ListItem, ListItemText, makeStyles, TextField, Typography, ListItemIcon, Paper, List, Checkbox, Dialog, Chip, Backdrop, CircularProgress, NativeSelect } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React from "react";
import { ErrorOutline } from "@material-ui/icons"
import { useHistory, useLocation } from "react-router-dom";
import { CategoryListAction } from "./../../../store/actions/CategoryAction"
import { AdditionOptionListAction } from "./../../../store/actions/AdditionOptionAction"
import { SizeOptionAction } from "./../../../store/actions/SizeOptionAction"
import { updateProduct } from "./../../../store/actions/ProductAction"


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
    },
    formControl: {
        minWidth: 120,
        marginTop: 20
    },
    paper: {
        width: 180,
        height: 230,
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: 140,
            height: 230,
        },
    },
    rootModal: {
        margin: 0,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    btnUpload: {
        marginLeft: 130,
        marginTop: 0,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 60
        },
    },
    displayImg: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: 60,
        },
    },
    errorImg: {
        color: 'red',
        marginLeft: 60,
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const EditProduct = () => {
    const classes = useStyles();

    const history = useHistory();

    const location = useLocation();

    const [product] = useState(location.state.product)

    const [cate, setCate] = useState(product.categoryId.name)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.category
    );

    const { additionOptions } = useSelector(
        (state) => state.additionOption
    );

    const { sizeOptions } = useSelector(
        (state) => state.sizeOption
    );

    var addOptionLeft = location.state.addition;

    var sizeOptionLeft = location.state.size;

    //get list category, addOption, sizeOption
    useEffect(() => {
        dispatch(CategoryListAction());
        dispatch(AdditionOptionListAction());
        dispatch(SizeOptionAction());
    }, [dispatch]);

    // Create product
    const onSubmit = (data) => {
        data.categoryId = categories.find(c => c.name === data.categoryId);
        data.additionOptions = right;
        data.sizeOptions = rightSize;
        data.multipartFile = data.multipartFile[0] ? data.multipartFile[0] : null;
        setOpenBD(!open);
        setTimeout(() => {
            dispatch(updateProduct(data)).then(res => history.push("/product"));
        }, 2000);
    };

    // Function add, remove tranfer list
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    // Handle tranferlist addOption
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([...product.additionOptions]);
    const [addOpen, setaddOpen] = useState(0);

    const handleClose = () => {
        setOpen(false);
        setChecked([]);
    };

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const handleOpenAdd = () => {
        if (addOpen === 0) {
            setaddOpen(1);
            for (let i = 0; i < product.additionOptions.length; i++) {
                addOptionLeft = addOptionLeft.filter(a => a.name !== product.additionOptions[i].name);
            }
            setLeft(addOptionLeft);
        }
        setOpen(true);
    }

    const handleRemoveAdd = (id) => {
        if (addOpen === 0) {
            setaddOpen(1);
            for (let i = 0; i < product.additionOptions.length; i++) {
                addOptionLeft = addOptionLeft.filter(a => a.name !== product.additionOptions[i].name);
            }
            addOptionLeft.push(additionOptions.find(e => e.id === id));
            setRight(right.filter(e => e.id !== id));
            setLeft(addOptionLeft);
        } else {
            setRight(right.filter(e => e.id !== id));
            setLeft([...left, additionOptions.find(e => e.id === id)]);
        }
    }

    // Handle tranferlist sizeOption
    const [openSize, setOpenSize] = useState(false);

    const handleCloseSize = () => {
        setChecked([]);
        setOpenSize(false);
    };

    const [leftSize, setLeftSize] = useState([]);
    const [rightSize, setRightSize] = useState(product.sizeOptions);
    const [addOpenSize, setaddOpenSize] = useState(0);

    const leftCheckedSize = intersection(checked, leftSize);
    const rightCheckedSize = intersection(checked, rightSize);


    const handleAllRightSize = () => {
        setRightSize(rightSize.concat(leftSize));
        setLeftSize([]);
    };

    const handleCheckedRightSize = () => {
        setRightSize(rightSize.concat(leftCheckedSize));
        setLeftSize(not(leftSize, leftCheckedSize));
        setChecked(not(checked, leftCheckedSize));
    };

    const handleCheckedLeftSize = () => {
        setLeftSize(leftSize.concat(rightCheckedSize));
        setRightSize(not(rightSize, rightCheckedSize));
        setChecked(not(checked, rightCheckedSize));
    };

    const handleAllLeftSize = () => {
        setLeftSize(leftSize.concat(rightSize));
        setRightSize([]);
    };

    const handleOpenAddSize = () => {
        if (addOpenSize === 0) {
            setaddOpenSize(1);
            for (let i = 0; i < product.sizeOptions.length; i++) {
                sizeOptionLeft = sizeOptionLeft.filter(a => a.name !== product.sizeOptions[i].name);
            }
            setLeftSize(sizeOptionLeft);
        }
        setOpenSize(true);
    }

    const handleRemoveSize = (id) => {
        if (addOpenSize === 0) {
            setaddOpenSize(1);
            for (let i = 0; i < product.sizeOptions.length; i++) {
                sizeOptionLeft = sizeOptionLeft.filter(a => a.name !== product.sizeOptions[i].name);
            }
            setRightSize(rightSize.filter(e => e.id !== id));
            sizeOptionLeft.push(sizeOptions.find(e => e.id === id));
            setLeftSize(sizeOptionLeft);
        } else {
            setRightSize(rightSize.filter(e => e.id !== id));
            setLeftSize([...leftSize, sizeOptions.find(e => e.id === id)]);
        }

    }


    // Custom tranfer list
    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    //Display image
    const [img, setImg] = useState();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(
                URL.createObjectURL(event.target.files[0])
            );
        }
    }

    //Backdrop
    const [openBD, setOpenBD] = React.useState(false);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h4">
                        Cập nhật sản phẩm
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item md={8} xs={12}>
                                <TextField
                                    name="id"
                                    inputRef={register()}
                                    defaultValue={product.id}
                                    style={{ display: 'none' }}
                                />
                                <TextField label="Nhập tên sản phẩm"
                                    style={{ marginTop: 10 }}
                                    defaultValue={product.name}
                                    fullWidth
                                    name="name"
                                    inputRef={register({ required: true })} />
                                {errors.name &&
                                    <FormHelperText style={{ color: 'red' }} id="component-error-text">Nhập tên sản phẩm</FormHelperText>
                                }
                                <TextField label="Nhập giá tiền"
                                    style={{ marginTop: 10 }}
                                    defaultValue={product.price}
                                    fullWidth
                                    name="price"
                                    inputRef={register({ required: "Nhập giá sản phẩm", pattern: { value: /^[0-9]+$/i, message: "Giá không hợp lệ" } })}
                                />
                                {errors.price?.message &&
                                    <FormHelperText style={{ color: 'red' }} id="component-error-text">{errors.price?.message}</FormHelperText>
                                }
                                <TextField label="Nhập nội dung"
                                    style={{ marginTop: 10 }}
                                    defaultValue={product.title}
                                    fullWidth
                                    name="title"
                                    inputRef={register({ required: true })}
                                />
                                {errors.title &&
                                    <FormHelperText style={{ color: 'red' }} id="component-error-text">Nhập nội dung sản phẩm</FormHelperText>
                                }
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="uncontrolled-native">Loại sản phẩm</InputLabel>
                                    <NativeSelect
                                        value={cate}
                                        onChange={e => { setCate(e.target.value) }}
                                        name="categoryId"
                                        error={errors.categoryId?.message && true}
                                        inputRef={register({
                                            validate: value => {
                                                if (value === 'default') {
                                                    return "chọn loại sản phẩm";
                                                }
                                            }
                                        })}
                                    >
                                        <option value='default'>Chưa chọn</option>
                                        {categories.map((cate) => (
                                            <option key={cate.id} value={cate.name}>{cate.name}</option>
                                        ))}
                                    </NativeSelect>
                                    {errors.categoryId?.message &&
                                        <FormHelperText style={{ color: 'red' }} id="component-error-text">{errors.categoryId?.message}</FormHelperText>
                                    }
                                </FormControl>


                                <div style={{ marginTop: 20 }}>
                                    <div style={{ display: 'flex' }}>
                                        <Typography>
                                            Kích thước:
                                        </Typography>
                                        <div style={{ marginBottom: 10 }}>
                                            {
                                                rightSize.length > 0 ? (
                                                    rightSize.map(item => (
                                                        <Chip style={{ marginTop: -5, marginLeft: 10, marginBottom: 10 }} variant="outlined" label={item.name} key={item.id} onDelete={() => handleRemoveSize(item.id)} />
                                                    ))
                                                ) : (<Chip
                                                    style={{ marginTop: -5, marginLeft: 10 }}
                                                    icon={<ErrorOutline />}
                                                    label="Chưa thêm kích thước"
                                                    color="secondary"
                                                    variant="outlined"
                                                />)
                                            }
                                        </div>
                                    </div>
                                    <Button color="primary" variant="contained" onClick={(handleOpenAddSize)}>Thêm kích thước</Button>
                                </div>


                                <div style={{ marginTop: 20 }}>
                                    <div style={{ display: 'flex' }}>
                                        <Typography>
                                            Topping:
                                        </Typography>
                                        <div style={{ marginBottom: 10 }}>
                                            {
                                                right.length > 0 ? (
                                                    right.map(item => (
                                                        <Chip style={{ marginTop: -5, marginLeft: 10, marginBottom: 10 }} variant="outlined" label={item.name} key={item.id} onDelete={() => handleRemoveAdd(item.id)} />
                                                    ))
                                                ) : (<Chip
                                                    style={{ marginTop: -5, marginLeft: 10 }}
                                                    icon={<ErrorOutline />}
                                                    label="Chưa thêm topping"
                                                    variant="outlined"
                                                    color="secondary"
                                                />)
                                            }
                                        </div>
                                    </div>
                                    <Button color="primary" variant="contained" onClick={(handleOpenAdd)}>Thêm topping</Button>
                                </div>
                            </Grid>


                            <Grid item md={4} xs={12}>
                                <img alt="" src={img ? img : product.linkImage} className={classes.displayImg} width={250} height={300} />
                                <label htmlFor="upload-photo">
                                    <TextField id="upload-photo" type="file"
                                        style={{ display: 'none' }}
                                        onChange={onImageChange}
                                        fullWidth
                                        name="multipartFile"
                                        inputRef={register({
                                            validate: value => {
                                                if (value[0]?.size >= 1048576) {
                                                    return "kích thước hình ảnh quả lớn";
                                                }
                                            }
                                        })} />
                                    {errors.multipartFile?.message &&
                                        <FormHelperText className={classes.errorImg} id="component-error-text">{errors.multipartFile?.message}</FormHelperText>
                                    }
                                    <Button color="secondary" variant="contained" component="span" className={classes.btnUpload}>
                                        Thêm ảnh
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>

                        <Dialog
                            open={openSize}
                            keepMounted
                            maxWidth="sm"
                            fullWidth={true}
                            onClose={handleCloseSize}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div>
                                <Typography style={{ fontSize: 24, paddingTop: 20, textAlign: 'center', color: '#3F51B5' }}>Thêm kích thước</Typography>
                            </div>
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                className={classes.rootModal}
                            >
                                <Grid item style={{ marginRight: 20 }}>{customList(leftSize)}</Grid>
                                <Grid item style={{ marginRight: 20 }}>
                                    <Grid container direction="column" alignItems="center" >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllRightSize}
                                            disabled={leftSize.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedRightSize}
                                            disabled={leftCheckedSize.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedLeftSize}
                                            disabled={rightCheckedSize.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllLeftSize}
                                            disabled={rightSize.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{customList(rightSize)}</Grid>
                            </Grid>
                        </Dialog>

                        <Dialog
                            open={open}
                            keepMounted
                            maxWidth="sm"
                            fullWidth={true}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div>
                                <Typography style={{ fontSize: 24, paddingTop: 20, textAlign: 'center', color: '#3F51B5' }}>Thêm Topping</Typography>
                            </div>
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                className={classes.rootModal}
                            >
                                <Grid item style={{ marginRight: 20 }}>{customList(left)}</Grid>
                                <Grid item style={{ marginRight: 20 }}>
                                    <Grid container direction="column" alignItems="center" >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllRight}
                                            disabled={left.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedRight}
                                            disabled={leftChecked.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedLeft}
                                            disabled={rightChecked.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllLeft}
                                            disabled={right.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{customList(right)}</Grid>
                            </Grid>
                        </Dialog>

                        <Backdrop className={classes.backdrop} open={openBD}>
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <Button type="submit" color="primary" variant="contained" style={{ marginTop: 20, marginLeft: '50%' }}>Cập nhật</Button>
                    </form>
                </Grid>
            </Grid>
        </div >
    )
}

export default EditProduct;