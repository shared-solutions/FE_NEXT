import React from "react";
import styles from "@/app/modules/voteCss/cardvoteitem.module.scss";
import Image from "next/image";
import useVoteStore from "@/app/zustand/normalVoteStore"; // 새로 만든 zustand 파일을 가져옵니다.

import deleteimg from "../../public/image/delete.png";
import addbutton from "../../public/image/add_button.png";
import check from "../../public/image/check.png";
import { FileImage } from "lucide-react";

const CardVoteItem = () => {
  const { addVoteItem, deleteVoteItem, updateVoteItem } = useVoteStore(); // voteItems와 setVoteItems를 가져옵니다.

  const voteItems = useVoteStore.getState().voteCardItems
  const handleAddItem = () => {
    const newItemNumber = voteItems.length + 1;
    const newItemText = `항목 ${newItemNumber}`;
    addVoteItem({ id: newItemNumber, placeholder: newItemText, image: null });
  };
  console.log(voteItems)
  const handleDeleteItem = (id) => {
    deleteVoteItem(id);
  };
  const handleStringChange = (e,id,image) => {
    const updatedItem = { id: id, placeholder: e.target.value.trim() === "" ? e.target.value : "", image: image };
      updateVoteItem(id, updatedItem);
  };
 
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        let dataURL = reader.result
        const enCoding = dataURL.split(',');
        
        if (enCoding.length === 2) {
        // Extract the base64 part
        dataURL = enCoding[1];

        // Now you can use the dataURL without the prefix
        console.log(dataURL);
    } else {
        console.error('Invalid data URL format');
    }
      const updatedItem = { id: id, placeholder: '', image: dataURL};
      updateVoteItem(id, updatedItem);
    };
    
    
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <span>항목</span>
            <div className={styles.check_container}>
                <Image
                    src={check}
                    style={{
                        width: 18,
                        height: 18,
                    }}
                    alt="check/"
                />
                <div>복수 선택</div>
            </div>
        </div>
        <div
            className={`${styles.box_container} ${
                voteItems && voteItems.length === 2 ? styles.centered : ""
            }`}
        >
            {voteItems &&
                voteItems.map((item) => (
                    <div key={item.id} className={styles.box}>
                        <div className={styles.top}>
                        <input
                            className={styles.write_item}
                            type="text"
                            placeholder={item.placeholder}
                            onChange={(e) => handleStringChange(e, item.id, item.image)}
                        />
                            <Image
                                src={deleteimg}
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                                alt="delete/"
                                onClick={() => handleDeleteItem(item.id)}
                            />
                        </div>
                        <div className={styles.bottom}>
                            <label htmlFor={`file-upload-${item.id}`}>
                                {item.image ? (
                                    <img
                                        src={"data:image/png;base64,"+item.image}
                                        alt="preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <FileImage />
                                )}
                            </label>
                            <input
                                type="file"
                                id={`file-upload-${item.id}`}
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, item.id)}
                            />
                        </div>
                    </div>
                ))}
        </div>
        <div className={styles.add_item}>
            <button onClick={handleAddItem}>
                <Image
                    src={addbutton}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    alt="add/"
                />
            </button>
            <div className={styles.add_context}>항목 추가하기</div>
        </div>
    </div>
);
};

export default CardVoteItem;
