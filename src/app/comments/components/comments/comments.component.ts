import { Component, Input, OnInit } from "@angular/core";
import { CommentsService } from "../../services/comments.service";
import { CommentInterface } from "../../types/comment.interface";

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html'
})

export class CommentsComponent implements OnInit {
    @Input() currentUserId!: string; // 100% sure that will be provided
    comments: CommentInterface[] = [];

    constructor(private commentsService: CommentsService) {
    }

    ngOnInit(): void {
        this.commentsService.getComments().subscribe((comments) => this.comments = comments);
    }

    /**
     * Add Comment
     * @param param
     */
    addComment({text, parentId}:{text:string, parentId: null|string}):void{
        this.commentsService.createComment(text, parentId).subscribe((createdComment) => {
            this.comments = [...this.comments, createdComment];
        });
    }
}