package handlers

import (
	"net/http"

	"go-workspace/db"

	"github.com/gin-gonic/gin"
)
import "fmt"

type PeopleID struct {

	ID     int `json:"id"`

	// Add other fields as needed
}


func Peoplelist(c *gin.Context) {

	var req PeopleID
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
	fmt.Println("req.ID",req.ID)
	// rows, err := dbConn.Query("SELECT id, name, age, email FROM people where id= ?;")
	query := "SELECT id, name, age, email FROM people where id<>?;"
	rows,err := dbConn.Query(query, req.ID)
	fmt.Println("rows",rows)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}
	defer rows.Close()

	var data []map[string]interface{}
	for rows.Next() {
		var id, age int
		var name,email string
		err := rows.Scan(&id, &name, &age, &email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read row"})
			return
		}
		fmt.Println("48-->rows",id, name, age, email)
		data = append(data, map[string]interface{}{"id": id, "name": name, "age": age, "email": email})
	}

	c.JSON(http.StatusOK, data)
}
