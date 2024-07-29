package main

import (
	"go-workspace/handlers"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Configure CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Change to the origin you need
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/login", func(c *gin.Context) {
		log.Println("GET /login called")
		handlers.LoginData(c)
	})
	r.POST("/register", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.Register(c)
	})
	r.POST("/groups", func(c *gin.Context) {
		log.Println("POST /groups called")
		handlers.Grouplist(c)
	})
	r.POST("/groupsUpdate", func(c *gin.Context) {
		log.Println("POST /groupsUpdate called")
		handlers.GroupUpdate(c)
	})
	r.POST("/GroupDelete", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.GroupDelete(c)
	})
	r.POST("/GroupInsert", func(c *gin.Context) {
		log.Println("POST /GroupDelete called")
		handlers.GroupInsert(c)
	})
	r.POST("/GroupMount", func(c *gin.Context) {
		log.Println("POST /GroupMount called")
		handlers.GroupMount(c)
	})
	r.POST("/GroupDetails", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.GroupDetails(c)
	})
	r.POST("/GroupDeatilsUpdate", func(c *gin.Context) {
		log.Println("POST /GroupDetails called")
		handlers.GroupDeatilsUpdate(c)
	})
	r.POST("/GroupDeatilsDelete", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.GroupDeatilsDelete(c)
	})
	r.POST("/GroupDeatilsInsert", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.GroupDeatilsInsert(c)
	})
	r.POST("/FetchGroupDetails", func(c *gin.Context) {
		log.Println("POST /FetchGroupDetails called")
		handlers.FetchGroupDetails(c)
	})
	r.POST("/AddPeopleInsert", func(c *gin.Context) {
		log.Println("POST /AddPeopleInsert called")
		handlers.AddPeopleInsert(c)
	})
	r.POST("/RemovePeople", func(c *gin.Context) {
		log.Println("POST /AddPeopleInsert called")
		handlers.RemovePeople(c)
	})
	r.POST("/GroupChats", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.GroupChats(c)
	})
	r.POST("/Chats", func(c *gin.Context) {
		log.Println("POST /Chats called")
		handlers.Chats(c)
	})
	r.POST("/GroupSend", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.GroupSend(c)
	})
	r.POST("/Send", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.Send(c)
	})
	r.POST("/Peoplelist", func(c *gin.Context) {
		log.Println("POST /register called")
		handlers.Peoplelist(c)
	})

	if err := r.Run(":5100"); err != nil {
		log.Fatalf("Could not start server: %v\n", err)
	}
}
