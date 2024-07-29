package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-workspace/db"
)

import "fmt"


type GroupChatRequest struct {

	ID     int `json:"group_id"`
	// Add other fields as needed
}


func GroupChats(c *gin.Context) {

	var req GroupChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()



	query := "select ch.id,ch.sender_id,p.name sender, ch.text from group_chat_history ch inner join people p on p.id = ch.sender_id where group_id = ? ORDER BY id asc LIMIT 30;"
	rows, err := dbConn.Query(query, req.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()

	var data []map[string]interface{}
	for rows.Next() {
		var id,sender_id int
		var text ,sender string
		err := rows.Scan(&id, &sender_id,&sender, &text)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id":id,"sender_id": sender_id, "sender":sender, "text": text})
	}

	c.JSON(http.StatusOK, data)
}


type GroupSendRequest struct {

	GroupId     int `json:"group_id"`
	SenderId int `json:"sender_id"`
	Text string `json:"text"`
	// Add other fields as needed
}

func GroupSend(c *gin.Context) {
	var req GroupSendRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	
	



	query := "INSERT INTO group_chat_history (group_id, sender_id, text) VALUES (?,?,?)"
	_, err = dbConn.Exec(query, req.GroupId, req.SenderId, req.Text)
	if err != nil {
		fmt.Println("92 err",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message sent to table"})
}
