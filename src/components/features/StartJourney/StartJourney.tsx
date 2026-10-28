import Image from 'next/image'
import styles from './startJpurney.module.css'

type StartJourneyType = {
  btnText: string
}

export default function StartJourney({ btnText }: StartJourneyType) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.content}>
          <h2 className={styles.title}>Начните путь к&nbsp;новому телу</h2>

          <ul className={styles.list}>
            <li>проработка всех групп мышц</li>
            <li>тренировка суставов</li>
            <li>улучшение циркуляции крови</li>
            <li>упражнения заряжают бодростью</li>
            <li>помогают противостоять стрессам</li>
          </ul>

          <button className={styles.btn}>{btnText}</button>
        </div>
      </section>

      <div className={styles.container_desktop}>
        <Image
          src="/images/boy-desktop-background.svg"
          alt="Узоры"
          width={1160}
          height={500}
          className={styles.boy_desktop_bg}
        />
        <Image
          src="/images/boy-desktop.png"
          alt="Бегун"
          width={500}
          height={510}
          className={styles.boy_desktop}
        />
      </div>

      <div className={styles.boy_mobile}></div>
    </div>
  )
}
