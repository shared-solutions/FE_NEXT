"use client";
import React from "react";
import styles from "@/app/modules/voteCss/normalvoteitem.module.scss";
import Image from "next/image";
import { FileImage } from "lucide-react";

import useGeneralVoteStore from "@/app/zustand/generalVoteStore";

import addbutton from "../../public/image/add_button.png";
import deleteimg from "../../public/image/delete.png";
import check from "../../public/image/check.png";

const NormalVoteItem = () => {
  //zustand
    const { addVoteItem, deleteVoteItem, updateVoteItem } = useGeneralVoteStore();
    const voteItems = useGeneralVoteStore.getState().voteGeneralItems;
    //functions
    const handleAddItem = () => {
        const newItemNumber = voteItems.length + 1;
        const newItemText = `투표 항목 ${newItemNumber}`;
        addVoteItem({ id: newItemNumber, placeholder: newItemText, image: null });
    };

    const handleDeleteItem = (id) => {
        deleteVoteItem(id);
    };

    const handleStringChange = (e, id, image) => {
        const updatedItem = { id: id, placeholder: e.target.value, image: image };
        updateVoteItem(id, updatedItem);
    };

    const handleFileChange = (e, id, placeholder) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
        let dataURL = reader.result;
        const enCoding = dataURL.split(",");

        if (enCoding.length === 2) {
            // Extract the base64 part
            dataURL = enCoding[1];

            // Now you can use the dataURL without the prefix
            console.log(dataURL);
        } else {
            console.error("Invalid data URL format");
        }
        const updatedItem = { id: id, placeholder: placeholder, image: dataURL };
        updateVoteItem(id, updatedItem);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.container}>
        <div className={styles.top}>
            <span>항목</span>

        </div>
        <div>
            {voteItems &&
            voteItems.map((item) => (
                <div key={item.id} className={styles.content_wrapper}>
                <div className={styles.img_container}>
                    <label htmlFor={`file-upload-${item.id}`}>
                    {item.image ? (
                        <img
                        src={"data:image/png;base64," + item.image}
                        alt="preview"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "50%",
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
                <div className={styles.box_container}>
                    <input
                    className={styles.write_item}
                    type="text"
                    placeholder={item.placeholder}
                    onChange={(e) => handleStringChange(e, item.id, item.image)}
                    />
                    <Image
                    className={styles.delete_button}
                    src={deleteimg}
                    alt="Delete"
                    width={30}
                    height={30}
                    onClick={() => handleDeleteItem(item.id)}
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

export default NormalVoteItem;
