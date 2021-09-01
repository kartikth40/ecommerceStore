import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ListOfCategories = ({ elements, keyword, edit, del, handleRemove }) => {
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
  const getAllElements = () =>
    elements.filter(searched(keyword)).map((c) => {
      return (
        <CategoryListItem key={c._id}>
          <CategoryListItemOverlapped>
            <div>{c.name}</div>
            <div>
              {del && (
                <DeleteBTN onClick={() => handleRemove(c.slug)}>
                  Delete
                </DeleteBTN>
              )}
              {edit && <EditBTN to={`/admin/category/${c.slug}`}>Edit</EditBTN>}
            </div>
          </CategoryListItemOverlapped>
        </CategoryListItem>
      )
    })

  return <CategoryList>{getAllElements()}</CategoryList>
}

export default ListOfCategories

const CategoryList = styled.div`
  border-radius: 20px;
  text-align: left;
  font-size: 1rem;
  font-weight: light;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
`
const CategoryListItem = styled.div`
  width: 100%;
  height: 3rem;
`
const CategoryListItemOverlapped = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-image: linear-gradient(10deg, #000000 0%, #434343 74%);
  color: white;
  border-radius: 20px 20px 0 0;
  height: 7rem;
  padding: 1rem;
  position: absolute;
  left: 0;
  right: 0;
`
const DeleteBTN = styled.button`
  padding: 5px;
  color: rgb(255, 150, 150);
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: light;
  cursor: pointer;
`
const EditBTN = styled(Link)`
  text-decoration: none;
  padding: 5px;
  color: rgb(255, 150, 150);
  background: transparent;
  font-size: 1rem;
  font-weight: light;
`
