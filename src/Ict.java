
import java.io.IOException;
import java.net.URL;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Region;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import javafx.stage.Screen;
import javafx.geometry.Rectangle2D;
import javafx.collections.ListChangeListener;
import javafx.scene.Node;
import java.util.Set;
import static javafx.application.Application.launch;
import java.util.Scanner;  
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.stage.WindowEvent;

 
public class Ict extends Application {
 
    private Scene scene;
    MyBrowser myBrowser;
     
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            Acme.Serve.Main.main(new String[]{"-a","aliases.properties","-p","8080","-l"});
        });
        t.start();
        launch(args);
    }
     
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("ICT");
     
        WebView webView = new WebView();
        
        myBrowser = new MyBrowser(webView);
        
        Screen screen = Screen.getPrimary();
        Rectangle2D bounds = screen.getVisualBounds();
        scene = new Scene(myBrowser, bounds.getWidth(), bounds.getHeight());
        primaryStage.setX(0);
        primaryStage.setY(0);
        primaryStage.setWidth(bounds.getWidth());
        primaryStage.setHeight(bounds.getHeight());
        
        webView.setPrefWidth(bounds.getWidth());
        webView.setPrefHeight(bounds.getHeight()-30);
        
        primaryStage.setScene(scene);
        primaryStage.show();
        
        primaryStage.setOnCloseRequest((WindowEvent t) -> {
            Platform.exit();
            try {
                Acme.Serve.Main.stop();
            } catch (IOException ex) {
                Logger.getLogger(Ict.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        
    }
     
    class MyBrowser extends Region{
             
        public MyBrowser(WebView webView){
            WebEngine webEngine = webView.getEngine();
            
            String html = "http://localhost:8080/html/splash.html";
            webEngine.load(html);
         
            getChildren().add(webView);
        }
    }
}