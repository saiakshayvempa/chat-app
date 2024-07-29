package handlers

import (
	"net/http"

	"fmt"
	"go-workspace/db"

	"github.com/gin-gonic/gin"
)

type RegisterRequest struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Age      int    `json:"age"`
	// Add other fields as needed
}

func Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	fmt.Println("26")
	dbConn, err := db.ConnectDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}
	defer dbConn.Close()

	fmt.Println("33")
	// Insert into people table"

	query1 := "INSERT INTO people (name, age,email) VALUES (?, ?, ?)"
	result, err := dbConn.Exec(query1, req.Name, req.Age, req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})

		fmt.Println(query1, req.Name, req.Age, req.Email)
		return
	}

	pplId, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve last inserted ID"})
		c.Error(err) // Log the error
		return
	}
	fmt.Println("insertedID", pplId)

	fmt.Println("pplId", pplId)

	query2 := "INSERT INTO logins ( name, password,people_id) VALUES (?, ?, ?)"
	_, err = dbConn.Exec(query2, req.Name, req.Password, pplId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

// func Register(c *gin.Context) {
// 	var req RegisterRequest
// 	if err := c.ShouldBindJSON(&req); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
// 		return
// 	}

// 	dbConn, err := db.ConnectDB()
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
// 		return
// 	}
// 	defer dbConn.Close()

// 	// Fetch existing max id from logins table"
// 	var regId int
// 	query1 := "SELECT COALESCE(MAX(id), 0) FROM logins;"
// 	err = dbConn.QueryRow(query1).Scan(&regId)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch max id from logins table", "details": err.Error()})
// 		return
// 	}
// 	regId++

// 	fmt.Println("regId", regId)

// 	var pplId int
// 	query3 := "SELECT COALESCE(MAX(id), 0) FROM people;"
// 	err = dbConn.QueryRow(query3).Scan(&regId)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch max id from logins table", "details": err.Error()})
// 		return
// 	}
// 	pplId++

// 	fmt.Println("pplId", pplId)

// 	query2 := "INSERT INTO logins (id, name, password,people_id) VALUES ($1, $2, $3)"
// 	_, err = dbConn.Exec(query2, regId, req.Name, req.Password)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
// 		return
// 	}

// 	// Fetch existing max id from people table"

// 	query4 := "INSERT INTO logins (id, name, age,email) VALUES ($1, $2, $3)"
// 	_, err = dbConn.Exec(query4, pplId, req.Name, req.Age, req.Email)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
// 		return
// 	}

// 	// Fetch existing max id from people table"
// 	var rowID int
// 	query5 := "SELECT COALESCE(MAX(id), 0) FROM ppl_lgn;"
// 	err = dbConn.QueryRow(query5).Scan(&regId)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch max id from logins table", "details": err.Error()})
// 		return
// 	}
// 	rowID++

// 	fmt.Println("regId", regId)

// 	query6 := "INSERT INTO ppl_lgn (id, login_id, people_id) VALUES ($1, $2, $3)"
// 	_, err = dbConn.Exec(query6, regId, pplId)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute query"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
// }
