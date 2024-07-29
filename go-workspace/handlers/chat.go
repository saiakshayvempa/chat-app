package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go-workspace/db"
)

import "fmt"

type ChatRequest struct {

	PeopleId     int `json:"people_id"`
	FriendId     int `json:"frn_id"`
	// Add other fields as needed
}


func Chats(c *gin.Context) {

	var req ChatRequest
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

	fmt.Println("After connection fecthed")

	query := "SELECT id,people_id,sender_id,text FROM chat_history WHERE (people_id = ? AND sender_id = ?) OR (people_id = ? AND sender_id = ?);"
	rows, err := dbConn.Query(query, req.PeopleId, req.FriendId,req.FriendId,req.PeopleId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()

	fmt.Println("After querry  fecthed")

	var data []map[string]interface{}
	for rows.Next() {
		var id,sender_id,people_id int
		var text  string
		err := rows.Scan(&id, &people_id, &sender_id, &text)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		data = append(data, map[string]interface{}{"id":id,"people_id": people_id,"sender_id": sender_id, "text": text})
	}

	fmt.Println("After mapping ")

	c.JSON(http.StatusOK, data)
}


type SendRequest struct {

	PeopleId     int `json:"people_id"`
	SenderId int `json:"sender_id"`
	Text string `json:"text"`
	// Add other fields as needed
}

func Send(c *gin.Context) {
	var req SendRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("80 ")
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()
	fmt.Println("80 ")

	
	fmt.Println("req.GroupId, req.SenderId, req.Text ", req.PeopleId, req.SenderId, req.Text)
	query := "INSERT INTO chat_history ( people_id, sender_id, text) VALUES (?,?,?)"
	_, err = dbConn.Exec(query, req.PeopleId, req.SenderId, req.Text)
	if err != nil {
		fmt.Println("err ",err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message sent to table"})
}
