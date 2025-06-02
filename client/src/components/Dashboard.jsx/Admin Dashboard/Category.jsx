import React, { useEffect, useState } from 'react'
import IconBtn from '../../reusable/IconBtn';
import { createCategory, editCategory } from '../../../services/operations/category';
import { useSelector } from 'react-redux';
import ListOfCategories from './ListOfCategories';
import { apiConnector } from '../../../services/apiconnector';
import { categories } from '../../../services/apis';
import toast from 'react-hot-toast';

function Category() {
    const { token } = useSelector((state) => state.auth)
    const [category, setCategory] = useState({
        name: "",
        description: ""
    });
    const [edit, setEdit] = useState(false);
    const [todoId, setTodoId] = useState(null);
    const [list, setList] = useState([]);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!edit) {
            const res = await createCategory(category, token);
            if (!res.data.success) {
                toast.error('Cannot create category');
            }
            const newCategory = res.data.data;
            setCategory({
                name: "",
                description: ""
            })
            setList(prev => (
                [...prev, newCategory]
            ))
        }
        else {

            const data = {
                ...category, categoryId: todoId
            }
            const res = await editCategory(data, token);
            if (!res.data.success) {
                toast.error('Cannot Edit category');
            }
            const editedCategory = res.data.data;
            setCategory({
                name: "",
                description: ""
            })
            setList(prev => (
                prev.map(cat => {
                    if (cat._id === editedCategory._id) {
                        return editedCategory
                    }
                    else return cat
                })
            ))
            setEdit(false);
        }
    }
    function handleChange(e) {
        setCategory((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }


    useEffect(() => {
        async function caller() {
            try {
                const result = await apiConnector("GET", categories.CATEGORIES_API);
                setList(result.data.data);
            } catch (err) {
                ("Couldn't fetch the list");
            }
        }
        caller();
    }, []);




    return (
        <div className='md:p-7 py-4 flex flex-col gap-5  mx-auto'>
            <h1 className="md:text-3xl text-2xl font-bold tracking-wider text-richblack-5">
                {edit ? 'Edit Category' : 'Create Category'}
            </h1>
            <form onSubmit={handleSubmit} className='flex w-[70%] bg-[#161c28] p-6 rounded-md text-[#c1c4cf] font-semibold flex-col gap-6'>
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="">Category Name</label>
                    <input placeholder='Enter category name , eg- web dev , app dev' name='name' value={category?.name} onChange={handleChange} type='text' autoComplete='off' className="form-style w-[90%]" /></div>
                <div className='flex gap-1 flex-col'>
                    <label htmlFor="">Category Description</label>
                    <input placeholder='Write about the category' name='description' value={category?.description} onChange={handleChange} type='text' autoComplete='off' className="form-style w-[90%]" />
                </div>
                <IconBtn customClasses={['mt-4', 'lg:w-[40%] w-full border-3']} type="submit" disabled={false} onclick={handleSubmit} >{edit ? 'Save Changes' : 'Add Category'}</IconBtn>
            </form>
            <ListOfCategories setTodoId={setTodoId} setCategory={setCategory} setEdit={setEdit} edit={edit} list={list} setList={setList} />
        </div>
    )
}

export default Category