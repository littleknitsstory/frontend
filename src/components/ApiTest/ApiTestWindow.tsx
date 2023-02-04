import {FC} from "react";
import s from './apiTestWindow.module.css'
import {Button} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getCategoriesThunk, selectCategories, setTestWindow} from "../../store/apiTestSlice";

export const ApiTestWindow: FC = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  return (
    <div className={s.testWindowWrap}>
      TEST
      <Button type='button'
              className={s.getButton}
              onClick={() => dispatch(getCategoriesThunk())}>Get Categories</Button>
      {categories.map((a, i) => <div className={s.categories}>
          <div key={i}>{a.title}</div>
          <div key={i}>{a.slug}</div>
        </div>
      )}

      <Button type='button'
              className={s.closeButton}
              variant="secondary"
              size='sm'
              onClick={() => dispatch(setTestWindow(false))}>Close</Button>
    </div>
  )
}