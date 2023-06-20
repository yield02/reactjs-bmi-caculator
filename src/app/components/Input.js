import styles from './css/Input.module.css'

export default function Input({lable, name, className, type = 'text', value = 50, setState =''}) {

    const handdleOnInput = (event) => {
        if(setState) {
            setState(event.target.value);
            return;
        }
        console.error('You must pass setState function to Component!!!')
    }

    return (
      <div className={`${className} ${styles.container} flex flex-col`}>
        <lable className={styles.lable} >{lable}</lable>
        <input className={styles.input} name={name} type={type} placeholder={value} onChange={handdleOnInput}></input>
      </div>
    )
  }
  